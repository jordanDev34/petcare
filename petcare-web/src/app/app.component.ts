import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  auth = inject(AuthService);
  readonly currentYear = new Date().getFullYear();

  constructor() {
    // Si un token existe déjà, je tente de récupérer /me au démarrage
    this.auth.loadMe();
  }

  onLogout() {
    this.auth.logout();
  }
}
