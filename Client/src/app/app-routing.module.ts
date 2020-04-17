import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MotivationComponent} from './motivation/motivation.component';
import {MedicalCondition} from './models/medicalCondition';
import {MedicalConditionComponent} from './medical-condition/medical-condition.component';
import {RegisterComponent} from './register/register.component';
import {RecordComponent} from './record/record.component';
import {CreateAlertComponent} from './create-alert/create-alert.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'motivation', component: MotivationComponent },
  { path: 'record', component: RecordComponent },
  { path: 'create-alert', component: CreateAlertComponent },
  { path: 'medCal', component: MedicalConditionComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
