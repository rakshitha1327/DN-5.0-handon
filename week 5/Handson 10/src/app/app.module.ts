import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseListComponent } from './course-list/course-list.component';
import { courseReducer } from './store/course.reducer';

@NgModule({
  declarations: [AppComponent, CourseCardComponent, CourseListComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ course: courseReducer })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
