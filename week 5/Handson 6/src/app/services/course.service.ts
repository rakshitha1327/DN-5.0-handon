import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';

/**
 * providedIn: 'root' registers this service with the application's
 * root injector. Angular creates ONE instance the first time it is
 * injected anywhere, and every subsequent injection — in any
 * component, directive, or other service, no matter how deep in the
 * tree — receives that SAME instance. This is what makes it a
 * singleton and lets unrelated components share live state simply
 * by injecting the service, with no @Input/@Output wiring needed.
 */
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courses: Course[] = [
    { id: 1, name: 'Introduction to Angular', code: 'CS201', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Data Structures',          code: 'CS202', credits: 4, gradeStatus: 'passed' },
    { id: 3, name: 'Database Systems',         code: 'CS301', credits: 3, gradeStatus: 'pending' },
    { id: 4, name: 'Operating Systems',        code: 'CS302', credits: 3, gradeStatus: 'failed'  },
    { id: 5, name: 'Software Engineering',     code: 'CS401', credits: 4, gradeStatus: 'pending' }
  ];

  getCourses(): Course[] {
    // Return a shallow copy so callers can't mutate the internal array directly.
    return [...this.courses];
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find(c => c.id === id);
  }

  addCourse(course: Course): void {
    this.courses.push(course);
  }
}
