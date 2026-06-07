import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileResponse } from '../../pages/profile/models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  editProfile(payload: any, id: string): Observable<ProfileResponse> {
    return this.http.put<any>(`api/usuario/hitbox/profile/${id}`, payload).pipe();
  }

  loadProfile(): Observable<ProfileResponse> {
    let token = localStorage.getItem('token');
    return this.http.get<any>(`api/usuario/hitbox/profile`, { headers: { 'Authorization': `Bearer ${token}` } }).pipe();
  }

}
