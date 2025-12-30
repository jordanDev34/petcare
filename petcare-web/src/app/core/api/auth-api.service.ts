import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = '/api/auth';

  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, payload);
  }

  me(): Observable<{ email: string; roles: { authority: string }[] }> {
    return this.http.get<{ email: string; roles: { authority: string }[] }>(`${this.baseUrl}/me`);
  }
}
