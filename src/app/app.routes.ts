import { Routes } from '@angular/router';
import { HomeComponent } from './features/dashboard/pages/home/home.component';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { SignupComponent } from './features/auth/pages/signup/signup.component';
import { AboutComponent } from './features/dashboard/pages/about/about.component';
import { PATH_URL_BASE } from './core/utils/constant/url';

export const routes: Routes = [
  {
    path: PATH_URL_BASE.home,
    component: HomeComponent,
    canActivate: [AuthGuard],
  }, // Home is a private route
  { path: PATH_URL_BASE.login, component: LoginComponent },
  { path: PATH_URL_BASE.signup, component: SignupComponent },
  { path: PATH_URL_BASE.about, component: AboutComponent },
];
