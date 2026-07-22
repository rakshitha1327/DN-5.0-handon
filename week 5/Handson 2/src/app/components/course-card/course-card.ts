import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
}

@Component({
  selector: 'app-course-card',
  imports: [],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {
  // Data flows DOWN into the component via @Input().
  @Input() course!: Course;

  // Events flow UP out of the component via @Output() + EventEmitter.
  // The generic <number> makes the emitted payload (the course id) strongly typed.
  @Output() enrollRequested = new EventEmitter<number>();

  // ngOnChanges fires whenever an @Input() reference changes — including on
  // the very first render (initial set counts as a "change").
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      const { previousValue, currentValue } = changes['course'];
      console.log('CourseCard course changed:', {
        previous: previousValue,
        current: currentValue,
      });
    }
  }

  onEnrollClick(): void {
    this.enrollRequested.emit(this.course.id);
  }
}
