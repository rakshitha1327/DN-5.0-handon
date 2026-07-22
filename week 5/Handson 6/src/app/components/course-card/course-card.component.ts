import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course.model';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {

  @Input({ required: true }) course!: Course;

  // EnrollmentService is root-provided, so this is the same instance
  // used by StudentProfileComponent — enrolling here is instantly
  // visible there too.
  constructor(private enrollmentService: EnrollmentService) {}

  get isEnrolled(): boolean {
    return this.enrollmentService.isEnrolled(this.course.id);
  }

  get buttonLabel(): string {
    return this.isEnrolled ? 'Unenroll' : 'Enroll';
  }

  toggleEnrollment(): void {
    if (this.isEnrolled) {
      this.enrollmentService.unenroll(this.course.id);
    } else {
      this.enrollmentService.enroll(this.course.id);
    }
  }
}
