import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../models/jwt.model';
import { CompanySelectionResponse } from '../../../pages/company/models/company.selection';
@Injectable({ providedIn: 'root' })
export class TokenService {

  private loggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  companies: CompanySelectionResponse[] = [];

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

  setCompanies(companies: CompanySelectionResponse[]) {
    localStorage.setItem('companies', JSON.stringify(companies))
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  getPayload(): JwtPayload | null {

    const token = this.getToken();

    if (!token) {
      return null;
    }

    return jwtDecode<JwtPayload>(token);
  }



  getTokenInvited(token: string): JwtPayload | null {

    if (!token) {
      return null;
    }

    return jwtDecode<JwtPayload>(token);
  }

  getUserName(): string {
    return this.getPayload()?.name ?? '';
  }

  getFullName(): string {
    return this.getPayload()?.fullName ?? '';
  }

  getSub(): string {
    return this.getPayload()?.sub ?? '';
  }

  getEmail(): string {
    return this.getPayload()?.email ?? '';
  }

  getCompanyName(): string {
    return this.getPayload()?.companyName ?? '';
  }

  getRole(): string {
    return this.getPayload()?.['X-User-Role'] ?? '';
  }

  getCompanyId(): string {
    return this.getPayload()?.['X-Company-Id'] ?? '';
  }

  getCompanies(): CompanySelectionResponse[] {
    let loadcompanies = localStorage.getItem('companies') || '';
    return JSON.parse(loadcompanies)
  }



  clear(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.loggedIn$.next(false);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
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

  getPermissions(): string[] {
    return this.getPayload()?.permissions ?? []
  }
  hasPermission(permission: string): boolean {
    return this.getPermissions()
      .includes(permission);

  }
  hasAnyPermission(...permissions: string[]): boolean {

    const userPermissions =
      this.getPermissions();

    return permissions.some(p =>
      userPermissions.includes(p)
    );

  }
  hasAllPermissions(...permissions: string[]): boolean {

    const userPermissions =
      this.getPermissions();

    return permissions.every(p =>
      userPermissions.includes(p)
    );

  }
}

