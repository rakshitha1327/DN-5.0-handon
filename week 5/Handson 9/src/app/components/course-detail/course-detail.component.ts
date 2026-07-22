import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css',
})
export class CourseDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);
  private enrollmentService = inject(EnrollmentService);

  course: Course | null = null;
  students: Student[] = [];
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Step 87: load the course, then switchMap into loading its
    // enrolled students. If the user navigates to a different course
    // before this resolves, switchMap drops the stale inner request.
    this.courseService
      .getCourseById(id)
      .pipe(
        switchMap((course) => {
          this.course = course;
          return this.enrollmentService.getStudentsByCourse(course.id);
        })
      )
      .subscribe({
        next: (students) => (this.students = students),
        error: (err) => {
          this.errorMessage = err.message;
          this.isLoading = false;
        },
        complete: () => (this.isLoading = false),
      });
  }
}
