import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CanComponentDeactivate } from '../../../guards/unsavedchanges.guard';

@Component({
  selector: 'app-reactive-enrollment-form',
  template: `
    <h2>Enroll (Reactive Form)</h2>
    <form [formGroup]="enrollForm" (ngSubmit)="onSubmit()">
      <div>
        <label>Full name</label>
        <input formControlName="fullName" />
      </div>
      <div>
        <label>Email</label>
        <input formControlName="email" type="email" />
      </div>
      <div>
        <label>Course</label>
        <select formControlName="courseId">
          <option value="1">Angular Fundamentals</option>
          <option value="2">Angular Routing Deep Dive</option>
          <option value="3">Reactive Forms Mastery</option>
          <option value="4">RxJS for Angular Devs</option>
        </select>
      </div>
      <button type="submit" [disabled]="enrollForm.invalid">Enroll</button>
    </form>
  `
})
export class ReactiveEnrollmentFormComponent implements OnInit, CanComponentDeactivate {
  enrollForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      courseId: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.enrollForm.valid) {
      console.log('Reactive enrollment submitted:', this.enrollForm.value);
      this.enrollForm.markAsPristine(); // clears dirty state so the guard lets us leave
    }
  }

  // Used by unsavedChangesGuard (step 77) to decide whether to prompt on navigation away.
  canDeactivate(): boolean {
    return !this.enrollForm.dirty;
  }
}
