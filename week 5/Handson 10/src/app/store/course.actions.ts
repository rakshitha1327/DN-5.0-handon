import { createAction, props } from '@ngrx/store';
import { Course } from '../models/course.model';

export const loadCourses = createAction('[Course List] Load Courses');

export const loadCoursesSuccess = createAction(
  '[Course API] Load Courses Success',
  props<{ courses: Course[] }>()
);

export const loadCoursesFailure = createAction(
  '[Course API] Load Courses Failure',
  props<{ error: string }>()
);

export const enrollRequested = createAction(
  '[Course Card] Enroll Requested',
  props<{ courseId: number }>()
);
