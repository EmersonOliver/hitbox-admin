import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryModel } from '../../pages/components/inventory-modal/models/inventory.model';
import { ApiPage } from '../api/api.response.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http: HttpClient) { }

  save(payload: FormData): Observable<InventoryModel> {
    return this.http.post<any>('api/hitbox/inventory/save', payload).pipe();
  }

   edit(id:number, payload: FormData): Observable<InventoryModel> {
    return this.http.put<any>(`api/hitbox/inventory/edit/${id}`, payload).pipe();
  }

  getPage(
    page = 0,
    size = 10
  ): Observable<ApiPage<InventoryModel>> {

    return this.http.get<
      ApiPage<InventoryModel>
    >(

      `api/hitbox/inventory/page?page=${page}&size=${size}`
    );
  }

  delete(id?:number):Observable<any> {
    return this.http.delete<any>(`api/hitbox/inventory/delete/${id}`).pipe();
  }
}
