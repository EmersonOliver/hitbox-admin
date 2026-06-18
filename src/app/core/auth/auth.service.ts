import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRequest } from '../../pages/login/models/auth.model';
import { TokenService } from './guards/token.service';
import { tap } from 'rxjs';
import { LoginResponse } from '../../pages/login/models/login.response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenService: TokenService) {

  }

  login(payload: AuthRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('api/usuario/hitbox/auth/login', payload).pipe(
      tap(res => {
        this.tokenService.setToken(res.token);
        this.tokenService.setCompanies(res.companies);
      })
    );
  }
}
