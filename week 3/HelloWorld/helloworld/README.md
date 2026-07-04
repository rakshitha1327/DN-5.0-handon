# Hello World RESTful Web Service

## Project Structure
```
spring-hello-world/
├── pom.xml
└── src/main/
    ├── java/com/cognizant/springlearn/
    │   ├── SpringLearnApplication.java
    │   └── controller/
    │       └── HelloController.java
    └── resources/
        └── application.properties
```

## Important Note on Package Naming
The task specified the controller package as `com.cognizant.spring-learn.controller`. A hyphen (`-`) is **not a legal character** in a Java package/identifier name — the compiler will reject it. This has been corrected to `com.cognizant.springlearn.controller` (hyphen removed). Everything else matches the spec exactly.

## How to Run
1. Import as a Maven project in your IDE, or run from the command line:
   ```
   mvn spring-boot:run
   ```
2. The embedded Tomcat server starts on port **8083** (configured in `application.properties`).
3. Once you see `Started SpringLearnApplication` in the console, hit the endpoint.

## Testing the Endpoint

**Browser (Chrome):**
```
http://localhost:8083/hello
```
You should see the plain text `Hello World!!` rendered on the page.

**Postman:**
- Method: `GET`
- URL: `http://localhost:8083/hello`
- Click **Send** → response body shows `Hello World!!`

**Console logs (start/end):**
You'll see DEBUG log lines bracketing the response for every request, e.g.:
```
DEBUG ... c.c.springlearn.controller.HelloController : Start :: sayHello()
DEBUG ... c.c.springlearn.controller.HelloController : End :: sayHello()
```

---

## SME Notes: Viewing HTTP Response Headers

### 1. Chrome DevTools → Network Tab
1. Open Chrome and press `F12` (or right-click → **Inspect**) to open DevTools.
2. Click the **Network** tab.
3. Make sure recording is on (the red dot in the top-left of the Network panel should be active) and that **Preserve log** is checked if you want to keep entries across reloads.
4. Navigate to `http://localhost:8083/hello` in the address bar (or refresh if already there).
5. In the request list, click the row for `hello`.
6. In the details pane that opens on the right, click the **Headers** sub-tab. You'll see two sections:
   - **Response Headers** — headers sent back by the server, e.g.:
     - `Content-Type: text/plain;charset=UTF-8` — because the controller method returns a plain `String` (not JSON), Spring's default `StringHttpMessageConverter` sets this.
     - `Content-Length` — size of the response body in bytes.
     - `Date` — timestamp when the response was generated.
     - `Connection: keep-alive` — connection reuse behavior.
   - **Request Headers** — headers your browser sent, e.g. `Accept`, `User-Agent`, `Host`, `Accept-Encoding`.
7. You can also expand **Response** or **Preview** tabs to confirm the raw body text `Hello World!!`.

### 2. Postman → Headers Tab
1. Create a new request in Postman: set method to `GET` and URL to `http://localhost:8083/hello`.
2. Click **Send**.
3. In the response pane (below the request), you'll see several tabs: **Body**, **Cookies**, **Headers**, **Test Results**.
4. Click the **Headers** tab. Postman displays a count badge (e.g. "Headers (6)") and lists all response headers returned by the server, typically including:
   - `Content-Type: text/plain;charset=UTF-8`
   - `Content-Length`
   - `Date`
   - `Connection`
   - Any server-specific headers (e.g. `Keep-Alive` from embedded Tomcat).
5. Unlike the browser Network tab, Postman's Headers tab shows only the **response** headers by default in that view; to inspect the **request** headers you sent, check the **Code** snippet generator or the request Headers tab above the Send button (where you can also manually add custom headers before sending).

### Why This Matters
Comparing the two tools reinforces that HTTP headers are just metadata traveling alongside the body — independent of which client (browser vs. Postman) issues the request. Both are inspecting the exact same wire-level response from the same Spring Boot embedded server; the only difference is the UI used to view it.
