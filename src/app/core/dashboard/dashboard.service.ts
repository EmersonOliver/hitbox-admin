import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardResponse } from '../../pages/dashboard/models/dashboard.model';
import { ProductDashboardResponse } from '../../pages/dashboard/models/product-dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  dashboard(): Observable<DashboardResponse> {
    return this.http.get<DashboardResponse>('api/hitbox/dashboard').pipe();
  }

  productDashboard(id:number):Observable<ProductDashboardResponse>{
    return this.http.get<ProductDashboardResponse>(`api/hitbox/dashboard/product/${id}`).pipe();
  }
}
