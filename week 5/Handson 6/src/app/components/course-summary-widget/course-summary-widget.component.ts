import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';

/**
 * A second, independent component that injects the SAME
 * CourseService singleton as CourseListComponent and HomeComponent.
 * It never talks to those components directly — the shared service
 * instance is the only thing keeping them in sync. Add a course in
 * CourseListComponent and this widget's count updates the next time
 * change detection runs, proving providedIn: 'root' really is a
 * single shared instance across the whole app.
 */
@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-summary-widget.component.html',
  styleUrl: './course-summary-widget.component.css'
})
export class CourseSummaryWidgetComponent {

  constructor(private courseService: CourseService) {}

  get courseCount(): number {
    return this.courseService.getCourses().length;
  }

  get passedCount(): number {
    return this.courseService.getCourses().filter(c => c.gradeStatus === 'passed').length;
  }
}
