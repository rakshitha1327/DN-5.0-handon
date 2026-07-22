import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { AppState } from '../store/course.reducer';
import { selectAllCourses, selectCoursesLoading } from '../store/course.selectors';
import { enrollRequested } from '../store/course.actions';

@Component({
  selector: 'app-course-list',
  standalone: false,
  templateUrl: './course-list.component.html'
})
export class CourseListComponent {
  courses$: Observable<Course[]> = this.store.select(selectAllCourses);
  loading$: Observable<boolean> = this.store.select(selectCoursesLoading);

  constructor(private store: Store<AppState>) {}

  onEnroll(courseId: number): void {
    this.store.dispatch(enrollRequested({ courseId }));
  }
}
