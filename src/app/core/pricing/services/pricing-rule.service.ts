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
        return this.http.post<PricingRule>(
            `api/hitbox/pricing-rule/save`,
            payload
        );
    }

    getPage(page: number, size: number): Observable<ApiPage<PricingRuleResponse>> {
        return this.http.get<ApiPage<PricingRuleResponse>>(`api/hitbox/pricing-rule/page`, {
            params: {
                page,
                size
            }
        }).pipe();
    }
}