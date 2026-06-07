import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPage } from '../api/api.response.model';
import { InventoryModel } from '../../pages/inventory/components/inventory-modal/models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http: HttpClient) { }

  save(payload: FormData): Observable<InventoryModel> {
    let token = localStorage.getItem('token');
    return this.http.post<any>('api/hitbox/inventory/save', payload, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).pipe();
  }

  edit(id: number, payload: FormData): Observable<InventoryModel> {
    let token = localStorage.getItem('token');
    return this.http.put<any>(`api/hitbox/inventory/edit/${id}`, payload, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).pipe();
  }

  getPage(
    page = 0,
    size = 10,
    idCategorias?: number[],
    sortField?: string,
    sortDirection?: string,
    search?: string
  ): Observable<ApiPage<InventoryModel>> {
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

    return this.http.get<ApiPage<InventoryModel>>(`api/hitbox/inventory/page`, {
      params, headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  listInventoryByCategory(tipoCategoria: string): Observable<InventoryModel[]> {
    let params = new HttpParams().append("tipoCategoria", tipoCategoria);
    let token = localStorage.getItem('token');
    return this.http.get<InventoryModel[]>(`api/hitbox/inventory/loadByCategory`, {
      params, headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  delete(id?: number): Observable<any> {
    let token = localStorage.getItem('token');
    return this.http.delete<any>(`api/hitbox/inventory/delete/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).pipe();
  }

  movementStock(payload: any, inventoryId?: number): Observable<any> {
    let token = localStorage.getItem('token');
    return this.http.post<any>(`api/hitbox/inventory/movements/${inventoryId}`, payload, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).pipe();

  }
}
