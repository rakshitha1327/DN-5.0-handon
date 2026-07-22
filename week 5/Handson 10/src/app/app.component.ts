import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  template: `
    <h1>Course Catalog</h1>
    <app-course-list></app-course-list>
  `
})
export class AppComponent {}
