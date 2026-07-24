import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPage } from '../api/api.response.model';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor(private http: HttpClient) { }

  createSupplier(payload: any): Observable<any> {
    return this.http.post<any>('api/hitbox/suppliers/create', payload).pipe();
  }

  page(page: number, size: number): Observable<ApiPage<any>> {
    return this.http.get<ApiPage<any>>('api/hitbox/suppliers/page/all', {
      params: { page: page, size: size }
    }).pipe();
  }
}
