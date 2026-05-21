export interface SuggestedPriceResult {

  ruleId: number;

  ruleName: string;

  salesChannel: string;

  quantity: number;

  productionCost: number;

  filamentCost: number;

  machineCost: number;

  energyCost: number;

  packagingCost: number;

  operationalCost: number;

  commercialCost: number;

  maintenanceCost: number;

  extrasCost: number;

  baseCost: number;

  suggestedPrice: number;

  profitValue: number;

  marketplaceFeeValue: number;

  cardFeeValue: number;

  unitCost: number;

  unitPrice: number;
}