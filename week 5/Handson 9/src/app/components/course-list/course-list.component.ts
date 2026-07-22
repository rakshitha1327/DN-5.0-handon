import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { CourseFormComponent } from '../course-form/course-form.component';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterLink, CourseFormComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export class CourseListComponent implements OnInit {
  private courseService = inject(CourseService);

  courses: Course[] = [];
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.courseService.getCourses().subscribe({
      next: (courses) => (this.courses = courses),
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      },
      complete: () => (this.isLoading = false),
    });
  }

  // Task 1 / step 81: wired to the course form's submit handler.
  onCreateCourse(course: Omit<Course, 'id'>): void {
    this.courseService.createCourse(course).subscribe({
      next: (created) => this.courses.push(created),
      error: (err) => (this.errorMessage = err.message),
    });
  }

  onDeleteCourse(id: number): void {
    this.courseService.deleteCourse(id).subscribe({
      next: () => (this.courses = this.courses.filter((c) => c.id !== id)),
      error: (err) => (this.errorMessage = err.message),
    });
  }
}
