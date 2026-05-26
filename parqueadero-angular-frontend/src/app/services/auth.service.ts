import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest, LoginResponse } from '../models/auth.model';

/**
 * SRP: AuthService tiene UNA sola responsabilidad:
 * gestionar la autenticación del usuario (login, logout, token).
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly loginUrl = `${environment.authUrl}/login`;

  constructor(private readonly http: HttpClient) {}

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, payload);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveTokens(response: LoginResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('refreshToken', response.refreshToken);
  }
}
