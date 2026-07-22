import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard, Course } from '../../components/course-card/course-card';
import { Highlight } from '../../directives/highlight';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCard, Highlight],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  isLoading = true;

  // Five hardcoded course objects passed down to each CourseCardComponent.
  courses: Course[] = [
    { id: 101, name: 'Introduction to Angular', code: 'CS-201', credits: 4, gradeStatus: 'passed', enrolled: true },
    { id: 102, name: 'Data Structures', code: 'CS-210', credits: 4, gradeStatus: 'pending', enrolled: false },
    { id: 103, name: 'Database Systems', code: 'CS-305', credits: 3, gradeStatus: 'failed', enrolled: false },
    { id: 104, name: 'Web Development', code: 'CS-220', credits: 3, gradeStatus: 'passed', enrolled: true },
    { id: 105, name: 'Software Engineering', code: 'CS-401', credits: 4, gradeStatus: 'pending', enrolled: false },
  ];

  selectedCourseId: number | null = null;

  ngOnInit(): void {
    // Simulate an async course fetch — hide the loading message after 1.5s.
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }

  // trackBy improves performance: without it, Angular treats every item in
  // the array as "new" on any array change (even if only one item changed)
  // and re-renders every <app-course-card> from scratch. With trackBy,
  // Angular identifies items by course.id, so it only creates/destroys/
  // updates the DOM nodes for items that actually changed, reusing the rest.
  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }
}
