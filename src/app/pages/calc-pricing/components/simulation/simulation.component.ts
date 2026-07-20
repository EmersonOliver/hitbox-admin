import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PricingRuleResponse } from '../../models/pricing.rules.response';
import { SuggestedPriceResult } from '../../models/suggested.pricing.model';
import { PricingRuleService } from '../../../../core/pricing/services/pricing-rule.service';
import { debounceTime } from 'rxjs';
import { RouterLink } from "@angular/router";
declare var bootstrap: any;
@Component({
  selector: 'app-simulation',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './simulation.component.html',
  styleUrl: './simulation.component.scss'
})
export class SimulationComponent implements OnInit, AfterViewInit {



  rules: PricingRuleResponse[] = [];
  simulationResults: SuggestedPriceResult[] = [];

  editar: boolean = false;
  ruleSelected?: PricingRuleResponse;

  constructor(private fb: FormBuilder, private pricingRuleService: PricingRuleService) {
    this.simulationForm
      .valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(() => {

        if (
          this.simulationForm.valid
        ) {

          this.simulate();
        }

      });
  }


  ngAfterViewInit(): void {
    this.initializeTooltips();
  }
  ngOnInit(): void {
    this.loadRules();
  }

  initializeTooltips(): void {

    setTimeout(() => {

      const tooltipList =
        document.querySelectorAll(
          '[data-bs-toggle="tooltip"]'
        );

      tooltipList.forEach((el: any) => {

        bootstrap.Tooltip.getOrCreateInstance(el);

      });

    });
  }
  private loadTooltips(): void {

    setTimeout(() => {

      const tooltipTriggerList =
        document.querySelectorAll(
          '[data-bs-toggle="tooltip"]'
        );

      tooltipTriggerList.forEach(
        (el: any) => {

          bootstrap.Tooltip
            .getOrCreateInstance(el);
        }
      );

    });
  }
  simulationForm = this.fb.group({

    quantity: [
      1,
      Validators.required
    ],

    productionCost: [
      0,
      Validators.required
    ],

    filamentWeight: [
      0
    ],

    filamentCostPerGram: [
      0
    ],

    printHours: [
      null, [Validators.pattern(
        /^(\d+d)?(\d+h)?(\d+m)?(\d+s)?$/
      )]
    ],

    machineHourCost: [
      0
    ],

    energyCost: [
      0
    ],
    packagingCost: [
      0
    ],
    maintenancePercentage: [
      1
    ],
    extras: this.fb.array([])
  });

  resetSimulationForm() {
    this.simulationResults = []
    this.simulationForm.reset({
      quantity: 1,
      productionCost: 0,
      filamentWeight: 0,
      filamentCostPerGram: 0,
      printHours: null,
      machineHourCost: 0,
      energyCost: 0,
      packagingCost: 0,
      maintenancePercentage: 1,
      extras: []
    });
  }
  loadRules(): void {

    this.pricingRuleService
      .findAll()
      .subscribe({

        next: response => {

          this.rules =
            response;
          console.log(response)
        },

        error: error => {

        }
      });
  }

  simulate(): void {
    const formValue =
      this.simulationForm.getRawValue();

    const payload = {

      ...formValue,

      printHours:
        this.parseDurationToHours(
          formValue.printHours
        )
    };

    this.pricingRuleService
      .simulate(payload)
      .subscribe({

        next: response => {

          this.simulationResults =
            response;
        },

        error: () => {

          this.simulationResults = [];
        }
      });
  }
  private parseDurationToHours(value: string | null): number {

    if (!value) {
      return 0;
    }

    const normalized =
      value.toLowerCase().trim();

    const days =
      this.extract(normalized, /(\d+)d/);

    const hours =
      this.extract(normalized, /(\d+)h/);

    const minutes =
      this.extract(normalized, /(\d+)m/);

    const seconds =
      this.extract(normalized, /(\d+)s/);

    return (
      (days * 24)
      + hours
      + (minutes / 60)
      + (seconds / 3600)
    );
  }

  private extract(
    value: string,
    regex: RegExp
  ): number {

    const match =
      value.match(regex);

    return match
      ? Number(match[1])
      : 0;
  }
}
