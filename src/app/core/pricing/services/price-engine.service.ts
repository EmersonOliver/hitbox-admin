import { Injectable } from '@angular/core';

import { PricingRule } from '../models/pricing-rule.model';

import { PricingSimulation } from '../models/pricing-simulation.model';

import { PricingResult } from '../models/pricing-result.model';

import { CalculationType } from '../enums/calculation-type.enum';
import { PricingRuleResponse } from '../../../pages/calc-pricing/models/pricing.rules.response';

@Injectable({
  providedIn: 'root'
})
export class PricingEngineService {

  calculate(
    rule: PricingRuleResponse,
    simulation: PricingSimulation
  ): PricingResult {
    let productionCost =
      rule.setupCost || 0;

    switch (
    rule.calculationType
    ) {

      case CalculationType.PER_GRAM:

        productionCost +=
          (
            simulation.weight || 0
          ) * (
            rule.pricePerGram || 0
          );

        break;

      case CalculationType.PER_HOUR:

        productionCost +=
          (
            simulation.hours || 0
          ) * (
            rule.pricePerHour || 0
          );

        break;

      case CalculationType.PER_UNIT:

        productionCost +=
          (
            simulation.quantity || 0
          ) * (
            rule.pricePerUnit || 0
          );

        break;

      case CalculationType.HYBRID:

        productionCost +=
          (
            simulation.weight || 0
          ) * (
            rule.pricePerGram || 0
          );

        productionCost +=
          (
            simulation.hours || 0
          ) * (
            rule.pricePerHour || 0
          );

        break;
    }

    productionCost +=
      rule.additionalCost || 0;

    if (
      rule.minimumPrice
      &&
      productionCost < rule.minimumPrice
    ) {

      productionCost =
        rule.minimumPrice;
    }

    const marketplaceFeeValue =
      productionCost *
      (
        (rule.marketplaceFee || 0) / 100
      );

    const cardFeeValue =
      productionCost *
      (
        (rule.cardFee || 0) / 100
      );

    const subtotalWithFees =
      productionCost
      +
      marketplaceFeeValue
      +
      cardFeeValue;

    const profitValue =
      subtotalWithFees *
      (
        (rule.profitMargin || 0) / 100
      );

    const total =
      subtotalWithFees + profitValue;

    return {

      total,

      productionCost,

      setupCost:
        rule.setupCost || 0,

      additionalCost:
        rule.additionalCost || 0,

      marketplaceFee:
        marketplaceFeeValue,

      cardFee:
        cardFeeValue,

      profitMargin:
        rule.profitMargin || 0,

      profitValue
    };
  }
}