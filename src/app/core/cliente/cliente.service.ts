import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPage } from '../api/api.response.model';
import { ClienteResponse } from '../../pages/clientes/models/cliente.response';
import { ClienteModel } from '../../pages/clientes/models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {




  constructor(private http: HttpClient) { }

  page(page: number, size: number, search: string, sort: string, sortDirection: string): Observable<ApiPage<ClienteResponse>> {
    let params =
      new HttpParams()
        .set('page', page)
        .set('size', size)
        .set(
          'sort',
          `${sort},${sortDirection}`
        );
    if (search) {
      params =
        params.set(
          'search',
          search
        );
    }
    return this.http.get<ApiPage<ClienteResponse>>('api/hitbox/clientes/page', {
      params
    }).pipe();
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`api/hitbox/clientes/delete/${id}`).pipe();
  }

  save(payload: ClienteModel): Observable<ClienteResponse> {
    return this.http.post<ClienteResponse>('api/hitbox/clientes/save', payload).pipe();
  }

  edit(payload: ClienteModel, id: string): Observable<ClienteResponse> {
    let params = new HttpParams().append('clienteId', id);
    return this.http.put<any>(`api/hitbox/clientes/edit`, payload, {
      params
    }).pipe();
  }

  findAll():Observable<ClienteResponse[]> {
    return this.http.get<ClienteResponse[]>('api/hitbox/clientes/findAll').pipe();
  }

}
