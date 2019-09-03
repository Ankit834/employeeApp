import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
import { AuthService } from './services/authentication/auth.service';
import { HomeComponent } from './home/home.component';
import { EmployeeListComponent } from './home/employee-list/employee-list.component';
import { AddEmployeeComponent } from './home/add-employee/add-employee.component';
import { EmployeeService } from './services/employee.service';
import { HeaderComponent } from './shared/header/header.component';
import { AuthGuard } from './services/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    EmployeeListComponent,
    AddEmployeeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, EmployeeService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
