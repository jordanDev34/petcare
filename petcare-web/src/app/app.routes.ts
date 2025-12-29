import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'PetCare - Accueil',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'PetCare - Connexion',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'PetCare - Inscription',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
