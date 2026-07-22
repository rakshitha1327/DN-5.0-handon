import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';

export type GradeStatus = 'passed' | 'failed' | 'pending';

export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  gradeStatus: GradeStatus;
  enrolled: boolean;
}

@Component({
  selector: 'app-course-card',
  imports: [CommonModule, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {
  // Data flows DOWN into the component via @Input().
  @Input() course!: Course;

  // Events flow UP out of the component via @Output() + EventEmitter.
  // The generic <number> makes the emitted payload (the course id) strongly typed.
  @Output() enrollRequested = new EventEmitter<number>();

  // Toggled by the "Show Details" button — controls the `expanded` class.
  isExpanded = false;

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

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  // [ngStyle] for the left border colour — a truly dynamic value (a colour
  // computed from data) that doesn't map cleanly onto a fixed set of CSS
  // classes, so ngStyle is the appropriate tool here rather than ngClass.
  get borderStyle(): Record<string, string> {
    const colors: Record<GradeStatus, string> = {
      passed: 'green',
      failed: 'red',
      pending: 'grey',
    };
    return { 'border-left-color': colors[this.course.gradeStatus] };
  }

  // Refactoring the ngClass object into a getter keeps the template free of
  // inline object-literal expressions — templates stay declarative and easy
  // to read, the conditional logic lives in the component class where it's
  // easier to unit test, and the same object shape can be reused/extended
  // without touching the HTML.
  get cardClasses(): Record<string, boolean> {
    return {
      'card--enrolled': this.course.enrolled,
      'card--full': this.course.credits >= 4,
      expanded: this.isExpanded,
    };
  }
}
