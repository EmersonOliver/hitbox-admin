import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  createCompany(payload: any): Observable<any> {
    let token = localStorage.getItem('token');
    return this.http.post<any>('api/usuario/hitbox/company/create', payload,
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    ).pipe();
  }
}
