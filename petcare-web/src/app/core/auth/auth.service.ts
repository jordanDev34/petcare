import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthApiService } from '../api/auth-api.service';

interface Credentials {
  email: string;
  password: string;
}

interface CurrentUser {
  email: string;
  roles: { authority: string }[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = inject(AuthApiService);
  private router = inject(Router);

  private readonly TOKEN_KEY = 'petcare_jwt';

  private currentUserSubject = new BehaviorSubject<CurrentUser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  get currentUser(): CurrentUser | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  constructor() {
    const token = this.getToken();
    if (token) {
      // Si un token existe deja, je tente de recuperer /me au demarrage
      this.loadMe().subscribe();
    }
  }

  // --- Gestion du token ---

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // --- API ---

   // Register : /api/auth/register => Je réutilise les mêmes credentials que pour login. Pas besoin de RegisterPayload ici.
  register(payload: Credentials) {
    return this.api.register(payload);
  }

  // Je charge /api/auth/me, met à jour currentUser et je renvoie un Observable<CurrentUser | null>.
  loadMe() {
    const token = this.getToken();
    if (!token) {
      this.currentUserSubject.next(null);
      return of(null);
    }

    return this.api.me().pipe(
      tap((user: any) => {
        this.currentUserSubject.next(user as CurrentUser);
      }),
      catchError((err) => {
        console.error('loadMe failed', err);
        this.currentUserSubject.next(null);
        this.clearToken();
        return of(null);
      })
    );
  }


   // Login : /api/auth/login -> JWT (je stocke le token) -> /api/auth/me
  login(payload: Credentials) {
    return this.api.login(payload).pipe(
      tap((res: any) => {
        this.setToken(res.accessToken);
      }),
      switchMap(() => this.loadMe()),
      map(() => void 0)
    );
  }

   // Logout : je clear le token, je remet currentUser à null et je repart sur la home

  logout(): void {
    this.clearToken();
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('/');
  }
}
