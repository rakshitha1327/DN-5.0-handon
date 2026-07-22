import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Course, CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <ng-container *ngIf="course; else notFound">
      <h2>{{ course.title }}</h2>
      <p>{{ course.description }}</p>
      <p><strong>Instructor:</strong> {{ course.instructor }}</p>
    </ng-container>
    <ng-template #notFound>
      <p>Course not found.</p>
    </ng-template>
    <p><a routerLink="/courses">Back to courses</a></p>
  `
})
export class CourseDetailComponent implements OnInit {
  course?: Course;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    // route.snapshot.paramMap is fine here because this component isn't reused
    // across different :id values while active (CourseListComponent triggers
    // a fresh navigation on each click). Use route.paramMap.subscribe(...)
    // instead if the same component instance needs to react to param changes.
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.course = this.courseService.getCourseById(+idParam);
    }
  }
}
