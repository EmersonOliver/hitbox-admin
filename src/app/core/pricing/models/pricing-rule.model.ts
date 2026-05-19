import { CalculationType } from '../enums/calculation-type.enum';
export interface PricingRule {

  id: number;

  name: string;

  category: string;

  calculationType: CalculationType;

  setupCost?: number;

  pricePerGram?: number;

  pricePerHour?: number;

  pricePerUnit?: number;

  additionalCost?: number;

  profitMargin?: number;

  minimumPrice?: number;

  marketplaceFee?: number;

  cardFee?: number;

  active: boolean;
}