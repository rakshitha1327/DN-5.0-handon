import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnrollmentRoutingModule } from './enrollment-routing.module';
import { EnrollmentFormComponent } from './enrollment-form/enrollment-form.component';
import { ReactiveEnrollmentFormComponent } from './reactive-enrollment-form/reactive-enrollment-form.component';

@NgModule({
  declarations: [EnrollmentFormComponent, ReactiveEnrollmentFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, EnrollmentRoutingModule]
})
export class EnrollmentModule {}
