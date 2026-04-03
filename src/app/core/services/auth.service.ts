import { Injectable } from '@angular/core';
import { UserSession } from '../models/user-session';

const USER_KEY = 'bp_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'Computer@123') {
      const user: UserSession = { name: 'admin', role: 'admin' };
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  }

  loginAsGuest(): void {
    const user: UserSession = { name: 'Guest', role: 'guest' };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  logout(): void {
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

  isAuthenticated(): boolean {
    return !!this.getUser();
  }
}
