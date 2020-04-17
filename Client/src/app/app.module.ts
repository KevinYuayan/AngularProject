import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppMaterialModule} from './angular.material';
import {AppRoutingModule} from './app-routing.module';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { MotivationComponent } from './motivation/motivation.component';
import {MotivationDialogComponent} from './motivation/motivation-dialog/motivation-dialog';
import { RecordComponent } from './record/record.component';
import {RecordDialogComponent} from './record/record-dialog/record-dialog';
import { MedicalConditionComponent } from './medical-condition/medical-condition.component';
import {RegisterComponent} from './register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {TokenInterceptor} from './core/token.interceptor';
import { CreateAlertComponent } from './create-alert/create-alert.component';
import {AlertDialogComponent} from './create-alert/alert-dialog/alert-dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MotivationComponent,
    MotivationDialogComponent,
    RecordComponent,
    RecordDialogComponent,
    MedicalConditionComponent,
    RegisterComponent,
    ToolbarComponent,
    CreateAlertComponent,
    AlertDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
