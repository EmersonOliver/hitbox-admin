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


  loadCategorias(page?: number, size?: number): Observable<ApiPage<CategoriaModel>> {
    if (page && size) {
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
