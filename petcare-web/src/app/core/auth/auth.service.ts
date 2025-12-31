import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, of, switchMap, tap, Observable } from 'rxjs';
import { AuthApiService, LoginPayload, RegisterPayload, MeResponse } from '../api/auth-api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authApi = inject(AuthApiService);
  private readonly router = inject(Router);

  private readonly TOKEN_KEY = 'petcare_jwt';

  // Etat utilisateur courant
  private readonly currentUserSubject = new BehaviorSubject<MeResponse | null>(null);
  readonly currentUser$ = this.currentUserSubject.asObservable();

  // Getter pratique visualiser l'utilisateur dans l'interface (header)
  get currentUser(): MeResponse | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  // --- Login / Register ---

  login(payload: LoginPayload): Observable<void> {
    return this.authApi.login(payload).pipe(
      tap((res) => {
        localStorage.setItem(this.TOKEN_KEY, res.accessToken);
      }),
      switchMap(() => this.loadMe())
    );
  }

  register(payload: RegisterPayload): Observable<void> {
    return this.authApi.register(payload).pipe(
      tap((res) => {
        localStorage.setItem(this.TOKEN_KEY, res.accessToken);
      }),
      switchMap(() => this.loadMe())
    );
  }

  // --- Chargement du /me ---

  loadMe(): Observable<void> {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) {
      this.currentUserSubject.next(null);
      return of(void 0);
    }

    return this.authApi.me().pipe(
      tap((user) => {
        this.currentUserSubject.next(user);
      }),
      catchError((err: unknown) => {
        console.error('Erreur loadMe()', err);
        this.currentUserSubject.next(null);
        localStorage.removeItem(this.TOKEN_KEY);
        return of(void 0);
      }),
      map(() => void 0)
    );
  }

  // Logout : je clear le token, je remet currentUser à null et je repart sur la home

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('/login');
  }
}
