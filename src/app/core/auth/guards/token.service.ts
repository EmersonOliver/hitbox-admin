import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TokenService {

  private loggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  private hasToken(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn() {
    return this.loggedIn$.asObservable();
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    this.loggedIn$.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  clear(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.loggedIn$.next(false);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    console.log(token)
    if (!token) return false;
    return !this.isTokenExpired(token);
  }
  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      if (!exp) return true;

      const now = Math.floor(Date.now() / 1000);
      return now >= exp;
    } catch (e) {
      return true;
    }
  }
}
