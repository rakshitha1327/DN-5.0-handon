import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CoursesLayoutComponent } from './pages/courses-layout/courses-layout.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { StudentProfileComponent } from './pages/student-profile/student-profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  // Nested routes (step 72): CoursesLayoutComponent hosts a <router-outlet>
  // for its own children.
  {
    path: 'courses',
    component: CoursesLayoutComponent,
    children: [
      { path: '', component: CourseListComponent },
      { path: ':id', component: CourseDetailComponent }
    ]
  },

  // Guarded route (step 76).
  { path: 'profile', component: StudentProfileComponent, canActivate: [authGuard] },

  // Lazy-loaded feature module (step 73), also guarded (step 76).
  {
    path: 'enroll',
    canActivate: [authGuard],
    loadChildren: () => import('./features/enrollment/enrollment.module').then(m => m.EnrollmentModule)
  },

  // Wildcard MUST be last — Angular matches routes in declaration order.
  { path: '**', component: NotFoundComponent }
];
