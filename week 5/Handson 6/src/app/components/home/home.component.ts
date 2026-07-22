import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  // Same CourseService singleton as CourseListComponent — adding a
  // course there updates this count without any extra wiring.
  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  get totalCourses(): number {
    return this.courseService.getCourses().length;
  }

  get enrolledCount(): number {
    return this.enrollmentService.getEnrolledCourses().length;
  }
}
