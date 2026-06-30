import {
    HttpClient
} from '@angular/common/http';

import {
    Injectable
} from '@angular/core';

import {
    Observable
} from 'rxjs';

import {
    PricingRule
} from '../models/pricing-rule.model';
import { ApiPage } from '../../api/api.response.model';
import { PricingRuleResponse } from '../../../pages/calc-pricing/models/pricing.rules.response';
import { SuggestedPriceResult } from '../../../pages/calc-pricing/models/suggested.pricing.model';

@Injectable({
    providedIn: 'root'
})
export class PricingRuleService {

    private readonly API =
        '/api/hitbox/pricing-rule';

    constructor(
        private http: HttpClient
    ) { }

    save(payload: PricingRule): Observable<PricingRule> {
        let token = localStorage.getItem('token');
        return this.http.post<PricingRule>(
            `api/hitbox/pricing-rule/save`,
            payload, {
            headers: { 'Authorization': `Bearer ${token}` }
        }
        );
    }

     saveV2(payload: any): Observable<PricingRule> {
        let token = localStorage.getItem('token');
        return this.http.post<PricingRule>(
            `api/hitbox/pricing-rule/save`,
            payload, {
            headers: { 'Authorization': `Bearer ${token}` }
        }
        );
    }

    edit(id: number, payload: PricingRule): Observable<PricingRule> {
        let token = localStorage.getItem('token');
        return this.http.put<PricingRule>(
            `api/hitbox/pricing-rule/edit`,
            payload, {
            params: { ruleId: id }, headers: { 'Authorization': `Bearer ${token}` }
        }
        );
    }

    getPage(page: number, size: number): Observable<ApiPage<PricingRuleResponse>> {
        let token = localStorage.getItem('token');
        return this.http.get<ApiPage<PricingRuleResponse>>(`api/hitbox/pricing-rule/page`, {
            params: {
                page,
                size
            }, headers: { 'Authorization': `Bearer ${token}` }
        }).pipe();
    }

    getSuggestedPrices(
        productionCost: number
    ) {
        let token = localStorage.getItem('token');
        return this.http.get<SuggestedPriceResult[]>(
            `api/hitbox/pricing-rule/suggested/price`,
            {
                params: {
                    productionCost
                },
                headers: { 'Authorization': `Bearer ${token}` }
            }
        );
    }
    simulate(productionCost: any) {
        let token = localStorage.getItem('token');
        return this.http.post<SuggestedPriceResult[]>(
            `api/hitbox/pricing-rule/suggested/price`, productionCost, {
            headers: { 'Authorization': `Bearer ${token}` }
        }
        );
    }

    deleteRule(id?: number): Observable<any> {
        let token = localStorage.getItem('token');
        return this.http.delete<any>(`api/hitbox/pricing-rule/delete/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).pipe();
    }

    findAll(): Observable<PricingRuleResponse[]> {
        let token = localStorage.getItem('token');
        return this.http.get<PricingRuleResponse[]>('api/hitbox/pricing-rule/findAll', {
            headers: { 'Authorization': `Bearer ${token}` }
        }).pipe();
    }

    ruleById(productionCost: any, ruleId: number) {
        let token = localStorage.getItem('token');
        return this.http.post<SuggestedPriceResult>(
            `api/hitbox/pricing-rule/ruleById/${ruleId}`, productionCost,
            { headers: { 'Authorization': `Bearer ${token}` } }
        );
    }

    saveDraft(currentStep: number, payload: any): Observable<any> {
        return this.http.post<any>(
            '/api/hitbox/pricing-rule/draft',
            {
                currentStep: currentStep,
                payload: payload
            }
        ).pipe();
    }

    loadDraft(): Observable<any> {
     return   this.http
            .get<any>(
                '/api/hitbox/pricing-rule/draft'
            ).pipe()
           ;
    }


}