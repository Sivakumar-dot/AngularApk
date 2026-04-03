import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserSession } from '../models/user-session';
import { environment } from '../../../environments/environment';

const USER_KEY = 'bp_user';
const ACCESS_TOKEN_KEY = 'bp_access_token';
const REFRESH_TOKEN_KEY = 'bp_refresh_token';

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<AuthTokens> {
    return this.http
      .post<AuthTokens>(`${environment.apiUrl}/auth/login`, {
        username,
        password,
      })
      .pipe(
        tap((tokens) => {
          this.saveTokens(tokens.access_token, tokens.refresh_token);
          const user: UserSession = {
            name: username || 'admin',
            role: 'admin',
          };
          localStorage.setItem(USER_KEY, JSON.stringify(user));
        })
      );
  }

  refreshAccessToken(): Observable<{ access_token: string }> {
    const refresh_token = this.getRefreshToken();
    return this.http.post<{ access_token: string }>(
      `${environment.apiUrl}/auth/refresh`,
      { refresh_token }
    );
  }

  loginAsGuest(): void {
    const user: UserSession = { name: 'Guest', role: 'guest' };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.saveTokens('guest-access', 'guest-refresh');
  }

  saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  getUser(): UserSession | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as UserSession;
    } catch {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
}
