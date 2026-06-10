import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardResponse } from '../../pages/dashboard/models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  dashboard(): Observable<DashboardResponse> {
    return this.http.get<DashboardResponse>('api/hitbox/dashboard').pipe();
  }
}
