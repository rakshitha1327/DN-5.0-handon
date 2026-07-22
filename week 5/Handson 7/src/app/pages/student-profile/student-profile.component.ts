import { Component } from '@angular/core';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  template: `
    <h2>Student Profile</h2>
    <p>You're seeing this page because you're logged in — this route is protected by AuthGuard.</p>
  `
})
export class StudentProfileComponent {}
