import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { CourseCardComponent } from './course-card.component';
import { Course } from '../models/course.model';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;

  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed'
  };

  // Step 101: TestBed setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseCardComponent]
    });

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
  });

  // Step 102: component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Step 103: @Input rendering
  it('should render the course name from the @Input', () => {
    component.course = mockCourse;
    fixture.detectChanges();

    const nameEl: HTMLElement = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(nameEl.textContent).toContain('Data Structures');
  });

  // Step 104: @Output event
  it('should emit enrollRequested with the course id when the button is clicked', () => {
    component.course = mockCourse;
    fixture.detectChanges();

    spyOn(component.enrollRequested, 'emit');

    const button: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    fixture.detectChanges();

    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });

  // Step 105: ngOnChanges
  it('should log to the console when the course input changes', () => {
    spyOn(console, 'log');

    const changes = {
      course: new SimpleChange(undefined, mockCourse, true)
    };
    component.ngOnChanges(changes);

    expect(console.log).toHaveBeenCalledWith(
      'CourseCardComponent: course input changed',
      mockCourse
    );
  });
});
