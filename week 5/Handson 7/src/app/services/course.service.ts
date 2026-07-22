import { Injectable } from '@angular/core';

export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
}

@Injectable({ providedIn: 'root' })
export class CourseService {
  private courses: Course[] = [
    { id: 1, title: 'Angular Fundamentals', description: 'Components, templates, and data binding basics.', instructor: 'A. Rao' },
    { id: 2, title: 'Angular Routing Deep Dive', description: 'Routes, guards, resolvers, and lazy loading.', instructor: 'P. Menon' },
    { id: 3, title: 'Reactive Forms Mastery', description: 'FormGroup, FormControl, validators, and dynamic forms.', instructor: 'S. Iyer' },
    { id: 4, title: 'RxJS for Angular Devs', description: 'Observables, operators, and reactive state patterns.', instructor: 'K. Nair' }
  ];

  getAllCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find(c => c.id === id);
  }

  searchCourses(term: string): Course[] {
    const lower = term.toLowerCase();
    return this.courses.filter(c =>
      c.title.toLowerCase().includes(lower) || c.description.toLowerCase().includes(lower)
    );
  }
}
