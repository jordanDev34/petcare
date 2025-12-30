import { Injectable, computed, signal, inject } from '@angular/core';
import {
  AuthApiService,
  AuthResponse,
  LoginPayload,
  MeResponse,
  RegisterPayload,
} from '../api/auth-api.service';
import { switchMap, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authApi = inject(AuthApiService);
  private readonly tokenKey = 'petcare_jwt';

  private userSignal = signal<MeResponse | null>(null);

  readonly user = computed(() => this.userSignal());
  readonly isAuthenticated = computed(() => !!this.userSignal());

  constructor() {
    // Restauration de session
    const token = this.getToken();
    if (token) {
      this.loadCurrentUser().subscribe({
        error: () => this.logout(),
      });
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setToken(token: string | null): void {
    if (token) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      localStorage.removeItem(this.tokenKey);
    }
  }

  /** Ici, je charge /api/auth/me et je mets à jour le signal user */
  loadCurrentUser() {
    return this.authApi.me().pipe(
      tap((user) => {
        this.userSignal.set(user);
      })
    );
  }

  /** Login : API => token => /me → userSignal */
  login(payload: LoginPayload) {
    return this.authApi.login(payload).pipe(
      tap((res: AuthResponse) => {
        this.setToken(res.accessToken);
      }),
      switchMap(() => this.loadCurrentUser())
    );
  }

  /** Register : API => token => /me => userSignal */
  register(payload: RegisterPayload) {
    return this.authApi.register(payload).pipe(
      tap((res: AuthResponse) => {
        this.setToken(res.accessToken);
      }),
      switchMap(() => this.loadCurrentUser())
    );
  }

  logout() {
    this.setToken(null);
    this.userSignal.set(null);
  }
}
