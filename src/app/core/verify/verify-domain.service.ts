import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VerifyDomainsResponse } from '../models/verify-domain.response';

@Injectable({
  providedIn: 'root'
})
export class VerifyDomainService {

  constructor(private http: HttpClient) { }


  verifyCRUDDomains(): Observable<VerifyDomainsResponse> {
    return this.http.get<VerifyDomainsResponse>('api/hitbox/verify/domains/all').pipe();

  }

}
