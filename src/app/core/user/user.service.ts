import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRequest } from '../../pages/register/models/user.request';
import { Observable } from 'rxjs';
import { UserResponse } from '../../pages/register/models/user.response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createFirstUser(payload: UserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>('api/usuario/hitbox/user/create', payload).pipe();
  }

  loadUsersByRole(userRole: string): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>('api/usuario/hitbox/user/load/users/by/role', {
      params: { userRole: userRole }
    });
  }

}
