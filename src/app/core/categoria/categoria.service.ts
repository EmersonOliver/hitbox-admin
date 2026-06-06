import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaModel } from '../../pages/categorias/model/categoria.model';
import { ApiPage } from '../api/api.response.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  salvarCategoria(payload: CategoriaModel): Observable<any> {
    let token = localStorage.getItem('token');
    return this.http.post<any>('api/hitbox/categoria/create', payload, { headers: { 'Authorization': `Bearer ${token}` } }).pipe();
  }

  editarCategoria(id: number, payload: CategoriaModel): Observable<any> {
    let token = localStorage.getItem('token');
    return this.http.put<any>('api/hitbox/categoria/update', payload, {
      params: { id: Number(id) },
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  removerCategoria(id: number): Observable<any> {
    let token = localStorage.getItem('token');
    return this.http.delete<any>('api/hitbox/categoria/remove', {
      params: { id: id },
      headers: { 'Authorization': `Bearer ${token}` }
    }).pipe();
  }


  loadCategorias(
    page: number,
    size: number,
    sortField?: string,
    sortDirection?: string,
    search?: string): Observable<ApiPage<CategoriaModel>> {

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
    return this.http.get<ApiPage<CategoriaModel>>(`api/hitbox/categoria/listAll`, {
      params
    }).pipe();
  }
  loadCategoriasWithouPages(): Observable<ApiPage<CategoriaModel>> {
    return this.http.get<ApiPage<CategoriaModel>>(`api/hitbox/categoria/listAll`).pipe();
  }

  loadCategoriasByParametro(tipoCategoria: string): Observable<CategoriaModel[]> {
    let params = new HttpParams().append("tipoCategoria", tipoCategoria);
    return this.http.get<CategoriaModel[]>('api/hitbox/categoria/parametros', {
      params
    })
  }
}
