# Spring Core – Load List of Countries from Spring Configuration XML

## Project Structure
```
spring-country-demo/
├── pom.xml
├── README.md
└── src/
    ├── country.xml
    ├── logback.xml
    ├── SpringLearnApplication.java
    └── com/airlines/model/Country.java
```

## How to Run
1. Import the project as a Maven project (`pom.xml` is included) in your IDE, or run from command line:
   ```
   mvn compile exec:java -Dexec.mainClass="SpringLearnApplication"
   ```
2. Ensure `country.xml` and `logback.xml` are on the classpath (Maven's `resources` config in `pom.xml` already handles this if `src` is your source root).
3. Run `SpringLearnApplication.main()`. You should see DEBUG-level log lines for each of the four countries.

## What Each File Does
- **Country.java** – Simple POJO with `code` and `name` properties.
- **country.xml** – Spring bean configuration:
  - Defines four individual `Country` beans (`in`, `us`, `de`, `jp`).
  - Defines a `countryList` bean of type `java.util.ArrayList`, populated via constructor injection using a `<list>` of `<ref>` elements pointing to the four beans.
- **logback.xml** – Enables DEBUG logging so `displayCountries()` output is visible on the console.
- **SpringLearnApplication.java** – Loads the Spring context from `country.xml`, retrieves the `countryList` bean, and logs each country at DEBUG level via `displayCountries()`.

## SME Notes: XML Elements Explained

### `<list>`
- A Spring collection element used to inject a `List` (or compatible collection) as a property or constructor argument.
- Preserves insertion order and allows duplicates, matching standard `List` semantics.
- Can contain simple values (`<value>`), bean references (`<ref>`), inner beans (`<bean>`), or nested collections.
- Here it's nested inside `<constructor-arg>` because `ArrayList`'s constructor accepts a `Collection` — Spring passes the `<list>` contents as that argument.

### `<ref>`
- Points to another bean already defined in the container, instead of creating a new inline value or inner bean.
- The `bean` attribute must match the `id` (or `name`) of an existing top-level bean definition.
- Lets Spring reuse the same singleton instances (`in`, `us`, `de`, `jp`) across the container rather than redefining them inline.
- Alternative forms: `<ref local="...">` (same file only) and `<ref parent="...">` (bean in a parent context) — `<ref bean="...">` is the standard, most flexible form.

### `bean` attribute (on `<ref>`)
- Tells Spring which bean definition to resolve and inject at that position.
- Must correspond to a valid bean `id`/`name` known to the `ApplicationContext`.
- Resolved eagerly at context startup — an invalid reference throws a `BeanCreationException` / `NoSuchBeanDefinitionException` immediately, which helps catch config typos early rather than at runtime use.

## Note on Bean Scope
The four country beans are singletons by default (Spring's default scope), so `countryList` holds references to the *same* instances used anywhere else in the context. This is typically desirable for static reference data like this, but worth keeping in mind if independent copies are ever needed elsewhere.
