import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService, LoginPayload } from '../api/auth-api.service';
import { tap } from 'rxjs';

const TOKEN_KEY = 'petcare_jwt';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authApi = inject(AuthApiService);
  private router = inject(Router);

  // état simple : connecté ou non
  isAuthenticated = signal<boolean>(!!localStorage.getItem(TOKEN_KEY));

  login(payload: LoginPayload) {
    return this.authApi.login(payload).pipe(
      tap((res) => {
        // Le token est stocké ici
        localStorage.setItem(TOKEN_KEY, res.accessToken);
        this.isAuthenticated.set(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
}
