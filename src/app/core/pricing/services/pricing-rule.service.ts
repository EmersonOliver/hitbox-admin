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
        return this.http.post<PricingRule>(
            `api/hitbox/pricing-rule/save`,
            payload
        );
    }

    edit(id: number, payload: PricingRule): Observable<PricingRule> {
        return this.http.put<PricingRule>(
            `api/hitbox/pricing-rule/edit`,
            payload, {
            params: { ruleId: id }
        }
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

    getSuggestedPrices(
        productionCost: number
    ) {

        return this.http.get<SuggestedPriceResult[]>(
            `api/hitbox/pricing-rule/suggested/price`,
            {
                params: {
                    productionCost
                }
            }
        );
    }
    simulate(productionCost: any) {
        return this.http.post<SuggestedPriceResult[]>(
            `api/hitbox/pricing-rule/suggested/price`, productionCost
        );
    }


}