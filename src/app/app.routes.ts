import { Routes } from '@angular/router';
import { HomeComponent } from './features/dashboard/pages/home/home.component';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { SignupComponent } from './features/auth/pages/signup/signup.component';
import { AboutComponent } from './features/dashboard/pages/about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] }, // Home is a private route
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'about', component: AboutComponent },
];
