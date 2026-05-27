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
    return this.http.post<any>(`api/hitbox/products/save`, payload).pipe();
  }

  edit(payload: FormData, id: number): Observable<ProductResponse> {
    return this.http.put<any>(`api/hitbox/products/edit/${id}`, payload).pipe();
  }

  page(page: number, size: number, idCategorias?: number[],
    sortField?: string,
    sortDirection?: string,
    search?: string): Observable<ApiPage<ProductResponse>> {
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
      params
    });
  }

  delete(id?: number): Observable<any> {
    return this.http.delete<any>(`api/hitbox/products/delete/${id}`).pipe();
  }

  findAll(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>('api/hitbox/products/findAll').pipe()
  }
}
