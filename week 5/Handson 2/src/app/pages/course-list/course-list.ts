import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard, Course } from '../../components/course-card/course-card';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList {
  // Five hardcoded course objects passed down to each CourseCardComponent.
  courses: Course[] = [
    { id: 101, name: 'Introduction to Angular', code: 'CS-201', credits: 4 },
    { id: 102, name: 'Data Structures', code: 'CS-210', credits: 4 },
    { id: 103, name: 'Database Systems', code: 'CS-305', credits: 3 },
    { id: 104, name: 'Web Development', code: 'CS-220', credits: 3 },
    { id: 105, name: 'Software Engineering', code: 'CS-401', credits: 4 },
  ];

  selectedCourseId: number | null = null;

  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }
}
