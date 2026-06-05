import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRequest } from '../../pages/login/models/auth.model';
import { TokenService } from './guards/token.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenService:TokenService) {

  }

  login(payload: AuthRequest): Observable<any> {
    return this.http.post<any>('api/usuario/hitbox/auth/login', payload).pipe(
       tap(res => this.tokenService.setToken(res.token))
    );
  }
}
