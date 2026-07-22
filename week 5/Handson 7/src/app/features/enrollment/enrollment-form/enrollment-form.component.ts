import { Component } from '@angular/core';

@Component({
  selector: 'app-enrollment-form',
  template: `
    <h2>Enroll (Template-Driven Form)</h2>
    <form #enrollForm="ngForm" (ngSubmit)="onSubmit(enrollForm)">
      <div>
        <label>Full name</label>
        <input name="fullName" ngModel required />
      </div>
      <div>
        <label>Email</label>
        <input name="email" ngModel type="email" required />
      </div>
      <div>
        <label>Course</label>
        <select name="courseId" ngModel required>
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
export class EnrollmentFormComponent {
  onSubmit(form: any): void {
    if (form.valid) {
      console.log('Template-driven enrollment submitted:', form.value);
    }
  }
}
