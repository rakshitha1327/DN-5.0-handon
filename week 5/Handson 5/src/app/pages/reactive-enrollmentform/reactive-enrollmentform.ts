import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

// --- Custom synchronous validator ---
// Rejects course codes that start with the disallowed 'XX' prefix.
// A validator is just a function: (control) => ValidationErrors | null.
function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value ?? '';
  return value.toString().toUpperCase().startsWith('XX')
    ? { noCourseCode: true }
    : null;
}

// --- Custom async validator ---
// Simulates a server-side "is this email already taken?" check. Async
// validators only run after all sync validators on the control pass, so we
// don't waste a "network call" on an obviously invalid email.
function simulateEmailCheck(
  control: AbstractControl
): Promise<ValidationErrors | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const email: string = control.value ?? '';
      resolve(email.includes('test@') ? { emailTaken: true } : null);
    }, 800);
  });
}

@Component({
  selector: 'app-reactive-enrollmentform',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollmentform.html',
  styleUrl: './reactive-enrollmentform.css',
})
export class ReactiveEnrollmentform implements OnInit {
  enrollForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: this.fb.control(
        '',
        [Validators.required, Validators.email],
        [simulateEmailCheck]
      ),
      courseId: [null, [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      // FormArray for dynamic, repeating "additional course" inputs.
      additionalCourses: this.fb.array([]),
    });
  }

  // Typed getter for the FormArray. Better than casting
  // (this.enrollForm.get('additionalCourses') as FormArray) inline in the
  // template because: (1) the cast logic lives in one place instead of
  // being repeated everywhere the array is used in the template, (2) the
  // template stays readable/declarative, and (3) TypeScript can catch
  // misuse of `additionalCourses` at compile time in the component class.
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  addCourse(): void {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  onSubmit(): void {
    // enrollForm.value only includes ENABLED controls — any control that
    // has been disabled (e.g. via control.disable()) is silently excluded
    // from the resulting object, even though it's still part of the form.
    console.log('enrollForm.value:', this.enrollForm.value);

    // enrollForm.getRawValue() includes ALL controls regardless of their
    // enabled/disabled state — use this when you need the complete form
    // model, for example before sending it to a backend that expects every
    // field even if some were temporarily disabled in the UI.
    console.log('enrollForm.getRawValue():', this.enrollForm.getRawValue());

    if (this.enrollForm.valid) {
      this.submitted = true;
    }
  }

  onReset(): void {
    this.enrollForm.reset({ preferredSemester: 'Odd' });
    this.submitted = false;
  }
}
