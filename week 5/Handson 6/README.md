# Student Course Portal — Services & DI Hands-On

Angular 20, standalone components. Implements both tasks from the
Digital Nurture 5.0 hands-on exercise.

## Run it

```bash
npm install
npm start
```

Then open http://localhost:4200.

If you'd rather generate a fresh CLI project and drop these files in:

```bash
ng new student-course-portal --standalone --style=css --routing=false
# then copy everything under src/app/ (and src/index.html, src/main.ts)
# into the generated project, overwriting the defaults.
```

## Where each step lives

**Task 1 — CourseService**
- `src/app/models/course.model.ts` — `Course` interface (step 59)
- `src/app/services/course.service.ts` — `providedIn: 'root'`, `courses` array, `getCourses()`, `getCourseById()`, `addCourse()` (step 58)
- `src/app/components/course-list/course-list.component.ts` — constructor injection, `ngOnInit` calls `getCourses()` (step 60)
- `src/app/components/home/home.component.ts` — reads `getCourses().length` for the stats row (step 61)
- `src/app/components/course-summary-widget/` — second independent component reading the same service, to prove the singleton (step 62)

**Task 2 — EnrollmentService & hierarchical DI**
- `src/app/services/enrollment.service.ts` — root-provided, `enrolledCourseIds`, `enroll()`, `unenroll()`, `isEnrolled()`, `getEnrolledCourses()`; injects `CourseService` internally via `inject()` — service-to-service injection (steps 63–64)
- `src/app/components/course-card/course-card.component.ts` — Enroll/Unenroll button toggle (step 65)
- `src/app/components/student-profile/student-profile.component.ts` — lists enrolled courses (step 66)
- `src/app/services/notification.service.ts` + `src/app/components/notification/notification.component.ts` — `providers: [NotificationService]` at the component level, with the "why" explained in a code comment (step 67)

## Verifying the singleton behavior

1. Open the app. Note the "Total Courses" stat and the Summary Widget's count both start at 5.
2. Click **+ Add Sample Course** in the course list.
3. Both the Home stats row and the Summary Widget update to 6 — neither component talked to the other directly; they just share the one `CourseService` instance from the root injector.
4. Click **Enroll** on any course card, then check "My Enrolled Courses" below — it updates immediately via the shared `EnrollmentService`.
5. Click **Add sample** in the Notifications box, then imagine a second `<app-notification>` on the page: because `NotificationService` is provided in `providers: [...]` on the component (not `providedIn: 'root'`), each instance would keep its own separate message list instead of sharing one global list.

## Key DI concepts demonstrated

- `providedIn: 'root'` → one singleton instance, shared by every injector in the app (`CourseService`, `EnrollmentService`).
- Component-level `providers: [...]` → a fresh instance created per component (and inherited by its children), isolated from any other instance elsewhere in the tree (`NotificationService`).
- Service-to-service injection → `EnrollmentService` injects `CourseService` with `inject()`, showing services can depend on each other just like a backend service layer.
