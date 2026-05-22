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
    return this.http.post<any>('api/hitbox/inventory/save', payload).pipe();
  }

  edit(id: number, payload: FormData): Observable<InventoryModel> {
    return this.http.put<any>(`api/hitbox/inventory/edit/${id}`, payload).pipe();
  }

  getPage(
    page = 0,
    size = 10,
    idCategorias?: number[],
    sortField?: string,
    sortDirection?: string,
    search?: string
  ): Observable<ApiPage<InventoryModel>> {

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
      params
    });
  }

  listInventoryByCategory(tipoCategoria: string): Observable<InventoryModel[]> {
    let params = new HttpParams().append("tipoCategoria", tipoCategoria);
    return this.http.get<InventoryModel[]>(`api/hitbox/inventory/loadByCategory`, {
      params
    });
  }

  delete(id?: number): Observable<any> {
    return this.http.delete<any>(`api/hitbox/inventory/delete/${id}`).pipe();
  }
}
