# REST - Get All Countries

## Project Structure
```
spring-country-service-v2/
├── pom.xml
└── src/main/
    ├── java/com/cognizant/springlearn/
    │   ├── SpringLearnApplication.java
    │   ├── controller/
    │   │   └── CountryController.java
    │   └── model/
    │       └── Country.java
    └── resources/
        ├── country.xml
        └── application.properties
```

This extends the earlier `/country` (single India record) service by adding a `/countries` endpoint that returns the full list. Both endpoints now live in the same `CountryController`.

## Note on Package Naming
As with earlier tasks, `com.cognizant.spring-learn.controller` (hyphenated) is not a legal Java package name, so this uses `com.cognizant.springlearn.controller` / `com.cognizant.springlearn.model` throughout.

## Note on List Order
The `countryList` bean in `country.xml` was reordered to `in, us, jp, de` to exactly match the sample response order given in the requirements (IN, US, JP, DE) — the earlier exercise had it as `in, us, de, jp`.

## What Changed From the Previous Version
- **`country.xml`** — `<list>` reordered as noted above (no new beans needed; `countryList` already existed from the earlier Spring Core exercise).
- **`CountryController.java`** — added a new method:
  ```java
  @GetMapping("/countries")
  public List<Country> getAllCountries() {
      logger.debug("Start :: getAllCountries()");
      List<Country> countryList = (List<Country>) applicationContext.getBean("countryList");
      logger.debug("End :: getAllCountries()");
      return countryList;
  }
  ```
  Note the annotation style difference: `getCountryIndia()` uses `@RequestMapping(value = "/country", method = RequestMethod.GET)` while `getAllCountries()` uses the shorthand `@GetMapping("/countries")` — both are functionally identical; `@GetMapping` is simply a composed annotation Spring introduced later as sugar for `@RequestMapping(method = RequestMethod.GET)`.

## How to Run
```
mvn spring-boot:run
```
Server starts on port **8083**.

## Testing the Endpoint

**Browser (Chrome):**
```
http://localhost:8083/countries
```

**Postman:**
- Method: `GET`
- URL: `http://localhost:8083/countries`
- Click **Send** → response body:
```json
[
  { "code": "IN", "name": "India" },
  { "code": "US", "name": "United States" },
  { "code": "JP", "name": "Japan" },
  { "code": "DE", "name": "Germany" }
]
```

---

## SME Notes

### What happens in the controller method?
1. A GET request to `/countries` is routed by `DispatcherServlet` to `getAllCountries()`.
2. `applicationContext.getBean("countryList")` retrieves the already-instantiated `ArrayList<Country>` singleton that was assembled from `country.xml` at application startup (via the `@ImportResource` import in `SpringLearnApplication`).
3. The method returns that `List<Country>` directly. Since the class is `@RestController`, Spring treats the return value as the response body rather than a view name.

### How is the list converted into a JSON array?
- Jackson (bundled with `spring-boot-starter-web`) handles collections the same way it handles single objects: it iterates the `List<Country>`, serializes each `Country` element using its public getters (`getCode()` → `"code"`, `getName()` → `"name"`), and wraps the resulting objects in a JSON array `[ ... ]`.
- No custom serialization code is required — Jackson's default `MappingJackson2HttpMessageConverter` handles arbitrary `List<T>` return types out of the box, as long as `T` (here, `Country`) has standard getters.
- `Content-Type: application/json` is set on the response, same as the single-country endpoint.

### Chrome DevTools → Network Tab
1. `F12` → **Network** tab → navigate to `http://localhost:8083/countries`.
2. Click the `countries` request → **Headers** sub-tab.
3. Under **Response Headers**, note:
   - `Content-Type: application/json`
   - `Content-Length` — will be noticeably larger than the single-country response since it's serializing 4 objects.
   - `Date`, `Connection`, `Keep-Alive` — same connection-level headers as before.
4. **Preview**/**Response** tab shows the JSON array formatted for inspection.

### Postman → Headers Tab
1. `GET` request to `http://localhost:8083/countries` → **Send**.
2. Click the **Headers** tab in the response pane.
3. Same header set as the single-country service: `Content-Type: application/json`, `Content-Length`, `Date`, `Connection`.
4. Postman's **Body** tab auto-pretty-prints the array with syntax highlighting since it recognizes the JSON content type.

### Quick Comparison Across All Three Endpoints Built So Far
| Endpoint | Return Type | Message Converter Used | Content-Type |
|---|---|---|---|
| `/hello` | `String` | `StringHttpMessageConverter` | `text/plain` |
| `/country` | `Country` (single object) | `MappingJackson2HttpMessageConverter` | `application/json` |
| `/countries` | `List<Country>` | `MappingJackson2HttpMessageConverter` | `application/json` |

The pattern to take away: Spring MVC never looks at *how* you built the object — only its *return type* — when deciding which converter (and therefore which `Content-Type`) to use.
