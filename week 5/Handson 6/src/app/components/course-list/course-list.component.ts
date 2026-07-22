import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { CourseCardComponent } from '../course-card/course-card.component';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCardComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {

  courses: Course[] = [];

  // Injected via constructor — Angular's DI resolves the singleton
  // instance from the root injector.
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courses = this.courseService.getCourses();
  }

  addSampleCourse(): void {
    const newCourse: Course = {
      id: Date.now(),
      name: 'New Elective',
      code: 'CS' + Math.floor(100 + Math.random() * 900),
      credits: 3,
      gradeStatus: 'pending'
    };
    this.courseService.addCourse(newCourse);
    // Re-read from the service so the local view reflects the shared state.
    this.courses = this.courseService.getCourses();
  }
}
