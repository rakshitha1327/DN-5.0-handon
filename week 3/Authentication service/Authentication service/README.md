# Authentication Service — Returns JWT

## Project Structure
```
spring-jwt-auth-service/
├── pom.xml
└── src/main/
    ├── java/com/cognizant/springlearn/
    │   ├── SpringLearnApplication.java
    │   ├── config/
    │   │   └── SecurityConfig.java        <-- Exercise 1
    │   ├── controller/
    │   │   └── AuthenticationController.java  <-- Exercises 1, 2 & 3
    │   ├── model/
    │   │   └── AuthenticationResponse.java
    │   └── util/
    │       └── JwtUtil.java               <-- Exercise 3
    └── resources/
        └── application.properties
```

## How to Run
```
mvn spring-boot:run
```
Server starts on port **8090**.

## Test It
```
curl -s -u user:pwd http://localhost:8090/authenticate
```
Response:
```json
{"token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiaWF0IjoxNzUxNjM0ODAwLCJleHAiOjE3NTE2MzYwMDB9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}
```
(The actual signature portion will differ each run since `iat`/`exp` timestamps change.)

Try a wrong password to confirm the failure path:
```
curl -s -i -u user:wrongpwd http://localhost:8090/authenticate
```
→ `401 Unauthorized`, body: `Incorrect username or password`

---

## The Three Hands-On Exercises

### Exercise 1 — Create the authentication controller and configure it in SecurityConfig
- `AuthenticationController` is created as a plain `@RestController` with a single `@GetMapping("/authenticate")` method.
- In `SecurityConfig`, the `SecurityFilterChain` bean explicitly marks `/authenticate` as `permitAll()`. This is a deliberate design choice: Spring Security's own `httpBasic()` support *could* validate the `Authorization` header automatically and reject bad credentials before the controller ever runs — but the exercise asks us to do that decoding and validation ourselves (Exercise 2), so we open the route up and take responsibility for authentication inside the controller instead.
- `SecurityConfig` also registers:
  - A `PasswordEncoder` bean (`BCryptPasswordEncoder`).
  - A `UserDetailsService` bean, hardcoded with the single user `user` / `pwd` (encoded), matching the sample curl command.
  - An `AuthenticationManager` bean, obtained from Spring's `AuthenticationConfiguration`, so it can be injected into the controller and used to validate credentials programmatically.

### Exercise 2 — Read the Authorization header and decode the username and password
- When curl is run with `-u user:pwd`, it doesn't send the credentials as-is — it Base64-encodes `"user:pwd"` and sends it in a header:
  ```
  Authorization: Basic dXNlcjpwd2Q=
  ```
- Inside `authenticate()`, this is handled step by step:
  1. `request.getHeader("Authorization")` retrieves the raw header value.
  2. The code checks it starts with `"Basic "` (the scheme prefix) and strips that prefix off.
  3. `Base64.getDecoder().decode(...)` decodes the remaining string back into bytes, then wraps it as a UTF-8 string — giving back `"user:pwd"`.
  4. `.split(":", 2)` separates it into `username` and `password` (limiting to 2 parts so a password containing a colon isn't split further).
- The extracted `username`/`password` pair is then handed to `authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password))`. Under the hood, this triggers Spring Security's `DaoAuthenticationProvider`, which loads the user via the `UserDetailsService` bean and checks the password against the stored (BCrypt-encoded) value using the `PasswordEncoder` bean. A mismatch throws `BadCredentialsException`, which the controller catches and turns into a `401`.

### Exercise 3 — Generate the token based on the user retrieved in the previous step
- Once credentials are validated, `userDetailsService.loadUserByUsername(username)` retrieves the full `UserDetails` object for that user.
- This is passed into `JwtUtil.generateToken(userDetails)`, which:
  1. Sets the JWT's **subject** claim to the username (`setSubject(userDetails.getUsername())`).
  2. Sets **issued-at** (`iat`) to the current time and **expiration** (`exp`) to current time + 20 minutes.
  3. Signs the token with an HMAC-SHA256 key (`SignatureAlgorithm.HS256`) built from a secret string, using the `jjwt` library's fluent builder (`Jwts.builder()...compact()`).
- The resulting compact JWT string (three Base64URL segments separated by `.` — header, payload, signature) is wrapped in an `AuthenticationResponse` object and returned. Because the controller is `@RestController`, Jackson serializes that object to `{"token": "..."}` automatically — the same JSON-conversion mechanism used in the earlier Country REST services.

## Security Notes for Production Use
This implementation is intentionally simplified for a learning exercise. Before using anything like it in production, consider:
- **Don't hardcode the JWT secret** in source code — load it from an environment variable, `application.properties` backed by a vault, or a dedicated secrets manager.
- **Don't hardcode user credentials** — back `UserDetailsService` with a real user store (database, LDAP, etc.).
- **Use HTTPS** — Basic Auth sends Base64-encoded (not encrypted) credentials; without TLS, they're as good as plaintext on the wire.
- **Consider token refresh/revocation** — a bare JWT with a fixed expiry has no way to be invalidated early if compromised; production systems often pair JWTs with refresh tokens or a blocklist.
