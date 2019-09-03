import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
import { HomeComponent } from './home/home.component';
import { AddEmployeeComponent } from './home/add-employee/add-employee.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard]},
  { path: 'add-employee/:id', component: AddEmployeeComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
