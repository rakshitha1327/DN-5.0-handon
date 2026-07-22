import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CourseListComponent } from './course-list.component';
import { CourseCardComponent } from '../course-card/course-card.component';
import { Course } from '../models/course.model';
import { AppState } from '../store/course.reducer';

describe('CourseListComponent (NgRx store-connected)', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let store: MockStore<AppState>;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Operating Systems', code: 'CS201', credits: 3, gradeStatus: 'in-progress' }
  ];

  const initialState: AppState = {
    course: { courses: mockCourses, loading: false, error: null }
  };

  // Step 109: configure TestBed with provideMockStore and an initial state
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseListComponent, CourseCardComponent],
      providers: [provideMockStore({ initialState })]
    });

    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should render course cards matching the initial state', () => {
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('app-course-card'));
    expect(cards.length).toBe(2);
  });

  // Step 110: simulate a loading state
  it('should show the loading indicator when loading is true', () => {
    store.setState({ course: { courses: [], loading: true, error: null } });
    fixture.detectChanges();

    const loadingEl = fixture.debugElement.query(By.css('.loading-indicator'));
    expect(loadingEl).toBeTruthy();
    expect(loadingEl.nativeElement.textContent).toContain('Loading courses');
  });

  it('should not show the loading indicator when loading is false', () => {
    fixture.detectChanges();

    const loadingEl = fixture.debugElement.query(By.css('.loading-indicator'));
    expect(loadingEl).toBeFalsy();
  });
});
