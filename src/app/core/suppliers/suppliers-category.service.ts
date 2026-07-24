import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SupplierCategoryResponse } from '../../pages/suppliers/models/response/supplier.category.response';

@Injectable({
  providedIn: 'root'
})
export class SuppliersCategoryService {

  constructor(private http: HttpClient) { }


  saveSupplierCategory(payload: any): Observable<any> {
    return this.http.post<any>('api/hitbox/suppliers/category/create', payload).pipe();
  }

  listAllCategoriesParameters(): Observable<SupplierCategoryResponse[]> {
    return this.http.get<SupplierCategoryResponse[]>('api/hitbox/suppliers/category/all').pipe();
  }
}
