import { Injectable } from '@angular/core';

import {
    HttpClient,
    HttpParams
} from '@angular/common/http';

import {
    Observable
} from 'rxjs';
import { ServiceOrderRequest } from '../../pages/service-orders/models/request/service-order-request.model';
import { ServiceOrderResponse } from '../../pages/service-orders/models/response/service-order-response.model';



@Injectable({
    providedIn: 'root'
})
export class ServiceOrderService {

    private readonly API =
        `api/hitbox/service-order`;

    constructor(
        private http: HttpClient
    ) { }

    /*
     * ==========================================
     * CREATE
     * ==========================================
     */

    create(
        request: ServiceOrderRequest
    ): Observable<ServiceOrderResponse> {

        return this.http.post<ServiceOrderResponse>(
            `${this.API}/create`,
            request
        );
    }

    /*
     * ==========================================
     * UPDATE
     * ==========================================
     */

    update(
        orderId: number,
        request: ServiceOrderRequest
    ): Observable<ServiceOrderResponse> {

        return this.http.put<ServiceOrderResponse>(
            `${this.API}/update/${orderId}`,
            request
        );
    }

    /*
     * ==========================================
     * DELETE
     * ==========================================
     */

    delete(
        orderId: number
    ): Observable<void> {

        return this.http.delete<void>(
            `${this.API}/delete/${orderId}`
        );
    }

    /*
     * ==========================================
     * FIND ALL
     * ==========================================
     */

    findAll(): Observable<ServiceOrderResponse[]> {

        return this.http.get<ServiceOrderResponse[]>(
            `${this.API}/find-all`
        );
    }

    /*
     * ==========================================
     * FIND BY ID
     * ==========================================
     */

    findById(
        orderId: number
    ): Observable<ServiceOrderResponse> {

        return this.http.get<ServiceOrderResponse>(
            `${this.API}/find-by-id/${orderId}`
        );
    }

    /*
     * ==========================================
     * FIND BY STATUS
     * ==========================================
     */

    findByStatus(
        status: string
    ): Observable<ServiceOrderResponse[]> {

        return this.http.get<ServiceOrderResponse[]>(
            `${this.API}/find-by-status/${status}`
        );
    }

    /*
     * ==========================================
     * START PRODUCTION
     * ==========================================
     */

    startProduction(
        orderId: number
    ): Observable<ServiceOrderResponse> {

        return this.http.patch<ServiceOrderResponse>(
            `${this.API}/start-production/${orderId}`,
            {}
        );
    }

    /*
     * ==========================================
     * FINISH ORDER
     * ==========================================
     */

    finish(
        orderId: number
    ): Observable<ServiceOrderResponse> {

        return this.http.patch<ServiceOrderResponse>(
            `${this.API}/finish/${orderId}`,
            {}
        );
    }

    /*
     * ==========================================
     * CANCEL ORDER
     * ==========================================
     */

    cancel(
        orderId: number
    ): Observable<ServiceOrderResponse> {

        return this.http.patch<ServiceOrderResponse>(
            `${this.API}/cancel/${orderId}`,
            {}
        );
    }

    /*
     * ==========================================
     * FILTER LOCAL
     * (future backend pagination/filter)
     * ==========================================
     */

    filter(
        params: {
            status?: string;
            customerName?: string;
            startDate?: string;
            endDate?: string;
        }
    ): Observable<ServiceOrderResponse[]> {

        let httpParams =
            new HttpParams();

        if (params.status) {
            httpParams =
                httpParams.set(
                    'status',
                    params.status
                );
        }

        if (params.customerName) {
            httpParams =
                httpParams.set(
                    'customerName',
                    params.customerName
                );
        }

        if (params.startDate) {
            httpParams =
                httpParams.set(
                    'startDate',
                    params.startDate
                );
        }

        if (params.endDate) {
            httpParams =
                httpParams.set(
                    'endDate',
                    params.endDate
                );
        }

        return this.http.get<ServiceOrderResponse[]>(
            `${this.API}/filter`,
            {
                params: httpParams
            }
        );
    }
}