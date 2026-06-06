import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResponse } from '../../pages/produtos/components/produto-modal/models/produto.model';
import { ApiPage } from '../api/api.response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  save(payload: FormData): Observable<any> {
    let token = localStorage.getItem('token');
    return this.http.post<any>(`api/hitbox/products/save`, payload,
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    ).pipe();
  }

  edit(payload: FormData, id: number): Observable<ProductResponse> {
    let token = localStorage.getItem('token');
    return this.http.put<any>(`api/hitbox/products/edit/${id}`, payload,
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    ).pipe();
  }

  page(page: number, size: number, idCategorias?: number[],
    sortField?: string,
    sortDirection?: string,
    search?: string): Observable<ApiPage<ProductResponse>> {
    let token = localStorage.getItem('token');
    let params =
      new HttpParams()

        .set('page', page)

        .set('size', size)

        .set(
          'sort',
          `${sortField},${sortDirection}`
        );
    if (search) {

      params =
        params.set(
          'search',
          search
        );
    }
    idCategorias?.forEach(id => {
      params =
        params.append(
          'idCategorias',
          id
        );
    });
    return this.http.get<ApiPage<ProductResponse>>('api/hitbox/products/page', {
      params, headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  delete(id?: number): Observable<any> {
    let token = localStorage.getItem('token');
    return this.http.delete<any>(`api/hitbox/products/delete/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).pipe();
  }

  findAll(): Observable<ProductResponse[]> {
    let token = localStorage.getItem('token');
    return this.http.get<ProductResponse[]>('api/hitbox/products/findAll', {
      headers: { 'Authorization': `Bearer ${token}` }
    }).pipe()
  }
}
