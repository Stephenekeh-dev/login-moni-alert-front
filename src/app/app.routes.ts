import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent,canActivate: [authGuard]}, 
  { path: 'register', component: RegisterComponent,canActivate: [authGuard] }, 
  { path: 'login', component: LoginComponent,canActivate: [authGuard]},
  { path: 'dashboard', component: DashboardComponent,  canActivate: [authGuard]} 
];

