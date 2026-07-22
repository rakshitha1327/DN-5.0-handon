import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css',
})
export class CourseFormComponent {
  @Output() createCourse = new EventEmitter<Omit<Course, 'id'>>();

  private fb = new FormBuilder();

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    instructor: ['', Validators.required],
    credits: [3, [Validators.required, Validators.min(0)]],
    description: [''],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.createCourse.emit(this.form.getRawValue());
    this.form.reset({ title: '', instructor: '', credits: 3, description: '' });
  }
}
