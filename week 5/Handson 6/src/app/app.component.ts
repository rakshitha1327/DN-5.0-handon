import { Component } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseSummaryWidgetComponent } from './components/course-summary-widget/course-summary-widget.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { NotificationComponent } from './components/notification/notification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
    CourseListComponent,
    CourseSummaryWidgetComponent,
    StudentProfileComponent,
    NotificationComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Student Course Portal';
}
