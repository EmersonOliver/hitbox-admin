import { HttpClient } from '@angular/common/http';
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
    return this.http.post<any>('api/hitbox/categoria/create', payload).pipe();
  }

  editarCategoria(id: number, payload: CategoriaModel): Observable<any> {
    return this.http.put<any>('api/hitbox/categoria/update', payload, {
      params: { id: Number(id) }
    });
  }

  removerCategoria(id: number): Observable<any> {
    return this.http.delete<any>('api/hitbox/categoria/remove', {
      params: { id: id }
    }).pipe();
  }


  loadCategorias(page: number, size: number): Observable<ApiPage<CategoriaModel>> {
    if (page != undefined && size != undefined) {
      console.log("aqui")
      return this.http.get<ApiPage<CategoriaModel>>(`api/hitbox/categoria/listAll`, {
        params: {
          page,
          size
        }
      }).pipe();
    }
    return this.http.get<ApiPage<CategoriaModel>>(`api/hitbox/categoria/listAll`).pipe();
  }
}
