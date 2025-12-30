import { Injectable, computed, signal, inject } from '@angular/core';
import {
  AuthApiService,
  AuthResponse,
  LoginPayload,
  MeResponse,
  RegisterPayload,
} from '../api/auth-api.service';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authApi = inject(AuthApiService);
  private readonly tokenKey = 'petcare_jwt';

  private userSignal = signal<MeResponse | null>(null);

  readonly user = computed(() => this.userSignal());
  readonly isAuthenticated = computed(() => !!this.userSignal());

  constructor() {
    // Je verrais ici plus tard : si un token existe, je pourrais appeler loadCurrentUser()
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

  login(payload: LoginPayload) {
    return this.authApi.login(payload).pipe(
      tap((res: AuthResponse) => {
        this.setToken(res.accessToken);
        // plus tard : this.loadCurrentUser().subscribe()
      })
    );
  }

  register(payload: RegisterPayload) {
    return this.authApi.register(payload).pipe(
      tap((res: AuthResponse) => {
        this.setToken(res.accessToken);
      })
    );
  }

  loadCurrentUser() {
    return this.authApi.me().pipe(
      tap((user) => {
        this.userSignal.set(user);
      })
    );
  }

  logout() {
    this.setToken(null);
    this.userSignal.set(null);
  }
}
