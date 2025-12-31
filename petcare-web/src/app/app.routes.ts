import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { authRedirectGuard } from './core/auth/auth-redirect.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    canActivate: [authRedirectGuard],
    loadComponent: () =>
      import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'pets',
    canMatch: [authGuard],
    loadComponent: () =>
      import('./features/pets/pets-page.component').then((m) => m.PetsPageComponent),
  },
  {
    path: 'register',
    canActivate: [authRedirectGuard],
    loadComponent: () =>
      import('./features/auth/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
