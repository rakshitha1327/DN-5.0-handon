import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, forkJoin, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Enrollment } from '../models/enrollment.model';
import { Student } from '../models/student.model';

const ENROLLMENTS_URL = 'http://localhost:3000/enrollments';
const STUDENTS_URL = 'http://localhost:3000/students';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private http = inject(HttpClient);

  /**
   * Looks up the enrollment rows for a course, then loads the matching
   * student records. Called from CourseDetailComponent via switchMap on
   * the selected courseId. switchMap (rather than mergeMap/concatMap)
   * cancels the previous inner Observable the moment a new courseId
   * arrives, so if the user clicks through courses quickly, an older
   * still-pending request can never resolve after a newer one and
   * overwrite it with stale data.
   */
  getStudentsByCourse(courseId: number): Observable<Student[]> {
    return this.http.get<Enrollment[]>(`${ENROLLMENTS_URL}?courseId=${courseId}`).pipe(
      switchMap((enrollments) => {
        if (enrollments.length === 0) {
          return of([]);
        }
        const requests = enrollments.map((e) =>
          this.http.get<Student>(`${STUDENTS_URL}/${e.studentId}`)
        );
        return forkJoin(requests);
      }),
      catchError((err) => {
        console.error(err);
        return throwError(() => new Error('Failed to load enrolled students.'));
      })
    );
  }
}
