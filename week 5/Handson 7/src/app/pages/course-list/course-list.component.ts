import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course, CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Courses</h2>
    <input
      type="text"
      placeholder="Search courses..."
      [(ngModel)]="searchTerm"
      (ngModelChange)="onSearchChange()"
    />
    <div class="card" *ngFor="let course of visibleCourses" (click)="goToCourse(course.id)">
      <h3>{{ course.title }}</h3>
      <p>{{ course.description }}</p>
    </div>
  `
})
export class CourseListComponent implements OnInit {
  searchTerm = '';
  visibleCourses: Course[] = [];

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Read the query param back on load (step 71).
    const existingSearch = this.route.snapshot.queryParamMap.get('search');
    if (existingSearch) {
      this.searchTerm = existingSearch;
    }
    this.applySearch();
  }

  onSearchChange(): void {
    // Update the URL to /courses?search=... without a full navigation reload.
    this.router.navigate(['/courses'], {
      queryParams: this.searchTerm ? { search: this.searchTerm } : {}
    });
    this.applySearch();
  }

  goToCourse(id: number): void {
    // step 70: navigate to /courses/:id when a card is clicked.
    this.router.navigate(['/courses', id]);
  }

  private applySearch(): void {
    this.visibleCourses = this.searchTerm
      ? this.courseService.searchCourses(this.searchTerm)
      : this.courseService.getAllCourses();
  }
}
