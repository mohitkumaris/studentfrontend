import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './Component/Login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { LandingComponent } from './Component/Landing/landing.component';
import {RouterModule} from '@angular/router';
import { TopNavigationComponent } from './Component/Landing/Navigation/top-navigation.component';
import { StudentTableComponent } from './Component/Landing/student-table/student-table.component';
import {HttpClientModule} from '@angular/common/http';
import { StudentDetailComponent } from './Component/Landing/student-detail/student-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    TopNavigationComponent,
      StudentTableComponent,
    StudentDetailComponent,

 ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'Login', component: LoginComponent},
      {path: 'Me', component: LandingComponent},
        {path: 'Me/:Id', component: StudentDetailComponent},
      {path: '', redirectTo : '/Me', pathMatch: 'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
