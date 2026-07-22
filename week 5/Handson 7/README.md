# Student Portal — Angular Routing Exercise

Implements both tasks from the Digital Nurture 5.0 Angular routing hands-on:
route configuration & nested routes, and lazy loading with route guards.

## Setup

```bash
npm install
npm start
```

Then open http://localhost:4200.

> This project was hand-scaffolded (no `ng new`), so before running for the
> first time make sure the Angular CLI dependencies resolve cleanly:
> `npm install` will pull in `@angular/cli` from `devDependencies`.

## Where each exercise step lives

**Task 1 — Route Configuration, Parameters and Nested Routes**

| Step | File |
|---|---|
| 68. Route table | `src/app/app.routes.ts` |
| 69. `CourseDetailComponent`, reads `:id` | `src/app/pages/course-detail/` |
| 70. Click card → navigate to `/courses/:id` | `src/app/pages/course-list/course-list.component.ts` (`goToCourse`) |
| 71. `?search=` query param | `src/app/pages/course-list/course-list.component.ts` (`onSearchChange`, `ngOnInit`) |
| 72. Nested routes under `/courses` | `src/app/pages/courses-layout/` + `app.routes.ts` |

**Task 2 — Lazy Loading and Route Guards**

| Step | File |
|---|---|
| 73. Lazy-loaded `EnrollmentModule` | `src/app/features/enrollment/` + `loadChildren` in `app.routes.ts` |
| 75. `AuthGuard` (`canActivate`) | `src/app/guards/auth.guard.ts` |
| 76. Guard applied to `/profile` and `/enroll` | `app.routes.ts` |
| 77. `CanDeactivate` guard for unsaved changes | `src/app/guards/unsavedchanges.guard.ts` + `reactive-enrollment-form.component.ts` |

## Verifying the expected outcomes

- Navigate to `/courses/2` → shows "Angular Routing Deep Dive".
- Type in the search box on `/courses` → URL updates to `/courses?search=...`.
- Visit an unknown path, e.g. `/nope` → 404 page.
- Open DevTools → Network tab → visit `/enroll` for the first time → a separate
  JS chunk downloads (only on that first visit).
- Set `AuthService.isLoggedIn = false` in `src/app/services/auth.service.ts`,
  then visit `/profile` → redirected to `/`.
- On `/enroll`, type into the reactive form, then click "Courses" in the nav
  → confirm dialog asks about unsaved changes.

## Notes on choices made

- Built with Angular's modern **standalone component** API (default since
  Angular v14+, and what the exercise itself refers to as `app.routes.ts`
  for "standalone" setups) for everything except the enrollment feature,
  which uses a classic `NgModule` + `RouterModule.forChild` per the
  exercise's explicit `ng generate module features/enrollment --routing`
  step. Mixing the two is fully supported — `loadChildren` can point at
  either an `NgModule` or a standalone route array.
- Guards are written as functional guards (`CanActivateFn`, `CanDeactivateFn`),
  which is the current recommended style over class-based `@Injectable()`
  guards in Angular 15+.
