# Course Manager — Angular HttpClient / RxJS / Interceptors

A standalone Angular 20 app built for the "Real Angular applications communicate
with backend APIs" exercise. It covers all three tasks against a JSON Server
mock backend.

## Run it

```bash
npm install
npm run api      # starts json-server on http://localhost:3000 (watches db.json)
npm start        # in a second terminal — starts ng serve on http://localhost:4200
```

Or run both at once with `npm run dev` (requires the `concurrently` dev dependency).

## Where each task lives

**Task 1 — HttpClient CRUD**
- `provideHttpClient()` is registered in `src/app/app.config.ts`.
- `src/app/services/course.service.ts` has `getCourses`, `getCourseById`,
  `createCourse`, `updateCourse`, `deleteCourse`.
- `src/app/components/course-list/course-list.component.ts` subscribes with
  `next` / `error` / `complete` and wires the create form's submit event to
  `createCourse`; delete is wired on each list item.
- `src/app/components/course-form/` is the reactive form that emits the POST
  payload.

**Task 2 — RxJS operators & error handling**
- `CourseService.getCourses()` pipes `map` (filters zero-credit rows), `tap`
  (logs the load without touching the stream), `retry(2)`, and `catchError`.
- `src/app/services/enrollment.service.ts` + `course-detail.component.ts`
  demonstrate `switchMap` chaining a course lookup into its enrolled-students
  request, with comments on why `switchMap` (not `mergeMap`) is correct here.

**Task 3 — Interceptors**
- `src/app/interceptors/auth.interceptor.ts` — attaches the mock bearer token.
- `src/app/interceptors/error-handler.interceptor.ts` — global 401/500
  handling, re-throws so local `catchError` still runs.
- `src/app/interceptors/loading.interceptor.ts` + `services/loading.service.ts`
  — `BehaviorSubject`-backed spinner using `finalize`.
- All three are registered, in order, in `provideHttpClient(withInterceptors([...]))`
  inside `app.config.ts`.
- `src/app/components/loading-spinner/` binds to `loadingService.isLoading$`
  with the async pipe and shows on every HTTP call.

## Verifying the expected outcomes

- **List loads from JSON Server / POST persists / DELETE removes**: use the
  "Add a course" form and the Delete button on each card; check `db.json` to
  confirm persistence.
- **Error handling**: stop `json-server` and reload — the error message and
  Retry button appear.
- **retry(2)**: visible via DevTools Network tab (two extra attempts before
  the final error surfaces) or `console.error` timing.
- **switchMap**: open a course's detail page (`/courses/:id`) to see its
  enrolled students loaded through the chained call.
- **Interceptors**: DevTools → Network → any request → Request Headers shows
  `Authorization: Bearer mocktoken-12345`; the top-of-page bar shows/hides
  with `finalize`.
