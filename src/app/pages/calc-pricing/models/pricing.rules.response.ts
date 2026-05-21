import { CalculationType } from "../../../core/pricing/enums/calculation-type.enum"

export interface PricingRuleResponse {
    id?: number;
    name: string;
    salesChannel: string;
    profitMargin: number;
    marketplaceFee: number;
    cardFee: number;
    operationalCost: number;
    commercialCost: number;
    minimumPrice: number;
    active: boolean;
}