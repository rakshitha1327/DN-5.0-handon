import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentFormComponent } from './enrollment-form/enrollment-form.component';
import { ReactiveEnrollmentFormComponent } from './reactive-enrollment-form/reactive-enrollment-form.component';
import { unsavedChangesGuard } from '../../guards/unsavedchanges.guard';

const routes: Routes = [
  { path: '', component: ReactiveEnrollmentFormComponent, canDeactivate: [unsavedChangesGuard] },
  { path: 'basic', component: EnrollmentFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentRoutingModule {}
