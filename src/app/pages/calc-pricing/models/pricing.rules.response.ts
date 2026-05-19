import { CalculationType } from "../../../core/pricing/enums/calculation-type.enum"

export interface PricingRuleResponse {
    id?: number;
    name: string;
    categoriaI: number;
    categoriaNome: string;
    calculationType: CalculationType;
    setupCost: number;
    pricePerGram: number;
    pricePerHour: number;
    pricePerUnit: number;
    additionalCost: number;
    profitMargin: number;
    minimumPrice: number;
    marketplaceFee: number;
    cardFee: number;
    active: boolean
}