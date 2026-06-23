import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OnboardingResponse } from '../../pages/company/models/company.onboarding';
import { CompanyRequest } from '../../pages/company/models/company.request';
import { CompanySelectedResponse } from '../../pages/company/models/company.selected.response';
import { TokenService } from '../auth/guards/token.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  createCompany(payload: CompanyRequest): Observable<OnboardingResponse> {
    let token = localStorage.getItem('token');
    return this.http.post<OnboardingResponse>('api/usuario/hitbox/company/create', payload,
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    ).pipe();
  }

  selectCompany(payload: any): Observable<CompanySelectedResponse> {
    return this.http.post<CompanySelectedResponse>('api/usuario/hitbox/company/select-company', payload)
  }

  loadCompanyByUser(userId: string): Observable<CompanySelectedResponse[]> {
    return this.http.get<CompanySelectedResponse[]>('api/usuario/hitbox/company/user/companys', {
      params: { userId: userId }
    });
  }
}
