import {
  AfterViewInit,
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Title
} from '@angular/platform-browser';

import {
  PricingRuleService
} from '../../core/pricing/services/pricing-rule.service';

import {
  ToastService
} from '../components/toast/toast.service';

import {
  PricingRuleResponse
} from './models/pricing.rules.response';

import {
  SuggestedPriceResult
} from './models/suggested.pricing.model';
import { ToastComponent } from "../components/toast/toast.component";

import {
  FormArray
} from '@angular/forms';

import {
  debounceTime
} from 'rxjs';

import {
  ProductExtraCost
} from './models/product-extra-cost.model';
import { ActivatedRoute, RouterModule } from "@angular/router";
import { RulesComponent } from "./components/rules/rules.component";
import { OperationalCostComponent } from "./components/operational-cost/operational-cost.component";
import { PricingMarginComponent } from './components/pricing-margin/pricing-margin.component';
import { PricingFeesComponent } from "./components/pricing-fees/pricing-fees.component";
import { PricingVariablesComponent } from './components/pricing-variables/pricing-variables.component';
import { PricingReviewComponent } from './components/pricing-review/pricing-review.component';

declare var bootstrap: any;

@Component({
  selector: 'app-calc-pricing',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RulesComponent,
    OperationalCostComponent,
    PricingMarginComponent,
    PricingFeesComponent,
    PricingVariablesComponent,
    PricingReviewComponent,
    ToastComponent
  ],

  templateUrl:
    './calc-pricing.component.html',

  styleUrl:
    './calc-pricing.component.scss'
})
export class CalcPricingComponent implements OnInit, AfterViewInit {
  steps = [

    {
      title: 'Informações Gerais',
      description: 'Nome da regra',
      enabled: true,
      completed: false
    },

    {
      title: 'Custos Operacionais',
      description: 'Custos base',
      enabled: false,
      completed: false
    },

    {
      title: 'Margens',
      description: 'Lucro desejado',
      enabled: false,
      completed: false
    },

    {
      title: 'Taxas',
      description: 'Marketplace e cartão',
      enabled: false,
      completed: false
    },

    {
      title: 'Variáveis',
      description: 'Customizações',
      enabled: false,
      completed: false
    },

    {
      title: 'Revisão',
      description: 'Conferência',
      enabled: false,
      completed: false
    }
  ];

  currentStep = 0;
  payload: any;

  constructor(private pricingRuleService: PricingRuleService, private toast: ToastService) { }

  onNextStep(event: any): void {
    const current = this.currentStep;
    // marca o step atual como concluído
    this.steps[current].completed = true;

    // habilita o próximo
    if (this.steps[event.nextStep]) {
      this.steps[event.nextStep].enabled = true;
    }

    // troca a etapa
    this.currentStep = event.nextStep;

    // salva os dados recebidos
    this.payload = {
      ...this.payload,
      ...event
    };

    this.saveDraft();

  }

  saveRule(payload: any) {
    this.pricingRuleService.saveV2(payload).subscribe({
      next: response => {
        console.log(response);
        this.toast.show('Salvo com sucesso', 'success')
      }
    })

  }

  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    this.loadDraft();
  }

  private saveDraft(): void {
    this.pricingRuleService.saveDraft(this.currentStep, this.payload).subscribe({
      next: response => {

      },
      error: (error) => {
        console.error(error.error.message)
      }
    });
  }

  private loadDraft(): void {

    this.pricingRuleService.loadDraft()
      .subscribe(draft => {

        if (!draft) {
          return;
        }

        this.currentStep = draft.currentStep;

        this.payload = draft.payload;

        this.steps.forEach((step, index) => {
          step.completed = index < this.currentStep;

          step.enabled = index <= this.currentStep;
        });
      });
  }

}