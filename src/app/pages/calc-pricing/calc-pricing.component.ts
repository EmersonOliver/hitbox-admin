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

declare var bootstrap: any;

@Component({
  selector: 'app-calc-pricing',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastComponent
  ],

  templateUrl:
    './calc-pricing.component.html',

  styleUrl:
    './calc-pricing.component.scss'
})
export class CalcPricingComponent implements OnInit, AfterViewInit {
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

  activeTab = 'rules';

  loading = false;

  currentPage = 1;

  pageSize = 5;

  search = '';

  selectedStatus = 'ALL';

  rules: PricingRuleResponse[] = [];

  simulationResults: SuggestedPriceResult[] = [];

  editar: boolean = false;
  ruleSelected?: PricingRuleResponse;
  ngAfterViewInit(): void {

    this.initializeTooltips();
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
  form: FormGroup = this.fb.group({
    name: [null, Validators.required],
    salesChannel: [null, Validators.required],
    profitMargin: [
      0,
      Validators.required
    ],

    marketplaceFee: [
      0
    ],

    cardFee: [
      0
    ],

    operationalCost: [
      0
    ],

    commercialCost: [
      0
    ],

    minimumPrice: [
      0
    ],

    active: [
      true
    ]
  });

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

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private pricingRuleService: PricingRuleService,
    private toast: ToastService
  ) {

    this.title.setTitle(
      'Hitbox - Cálculos'
    );

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

  ngOnInit(): void {
    this.loadRules();
  }

  loadRules(): void {

    this.pricingRuleService
      .getPage(
        this.currentPage - 1,
        this.pageSize
      )
      .subscribe({

        next: response => {

          this.rules =
            response.content;
          console.log(response)
        },

        error: error => {

          this.toast.show(
            'Erro ao carregar regras',
            'danger'
          );
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

  submit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const request = this.editar ?
      this.pricingRuleService.edit(
        this.ruleSelected!.id!,
        this.form.getRawValue()
      ) : this.pricingRuleService
        .save(this.form.getRawValue());

    request
      .subscribe({
        next: () => {
          this.loading = false;
          this.toast.show(
            'Regra salva com sucesso',
            'success'
          );
          this.form.reset({

            profitMargin: 0,
            marketplaceFee: 0,
            cardFee: 0,
            operationalCost: 0,
            commercialCost: 0,
            minimumPrice: 0,
            active: true
          });
          this.editar = false;
          this.ruleSelected = {} as PricingRuleResponse;
          this.loadRules();
        },

        error: () => {
          this.loading = false;
          this.toast.show(
            'Erro ao salvar regra',
            'danger'
          );
        }
      });
  }

  get filteredRules() {

    return this.rules.filter(rule => {

      const matchesSearch =
        rule.name
          .toLowerCase()
          .includes(
            this.search.toLowerCase()
          );

      const matchesStatus =
        this.selectedStatus === 'ALL'
        ||
        (
          this.selectedStatus === 'ACTIVE'
          &&
          rule.active
        )
        ||
        (
          this.selectedStatus === 'INACTIVE'
          &&
          !rule.active
        );

      return (
        matchesSearch
        &&
        matchesStatus
      );
    });
  }

  get paginatedRules() {

    const start =
      (
        this.currentPage - 1
      ) * this.pageSize;

    return this.filteredRules.slice(
      start,
      start + this.pageSize
    );
  }

  get totalPages(): number {

    return Math.ceil(
      this.filteredRules.length /
      this.pageSize
    );
  }

  changePage(page: number): void {

    if (
      page < 1
      ||
      page > this.totalPages
    ) {
      return;
    }

    this.currentPage = page;
  }
  removeRule(id: number | undefined) {
    this.pricingRuleService.deleteRule(id).subscribe({
      next: res => {
        this.toast.show('Regra removida com sucesso!', 'success');
        this.loadRules();
      }, error: (error) => {
        this.toast.show('Ocorreu um erro ao excluir a regra!' + error.error.message, 'danger');
      }
    })
  }

  selectRule(item: PricingRuleResponse) {
    this.ruleSelected = item;

    const element =
      document.getElementById('ruleExclusaoModal');

    if (!element) {
      return;
    }

    const modal =
      new bootstrap.Modal(element);

    modal.show();

  }

  editRule(item: PricingRuleResponse) {
    this.fillForm(item);
    this.ruleSelected = item;
  }

  private fillForm(rule: PricingRuleResponse): void {
    if (rule.id)
      this.form.patchValue({
        id: rule.id,
        name: rule.name,
        salesChannel: rule.salesChannel,
        profitMargin: rule.profitMargin,
        marketplaceFee: rule.marketplaceFee,
        cardFee: rule.cardFee,
        operationalCost: rule.operationalCost,
        commercialCost: rule.commercialCost,
        minimumPrice: rule.minimumPrice,
        active: rule.active
      });

    this.editar = true;
  }
  descartarAlteracoes() {
    this.form.reset({
      id: null,
      profitMargin: 0,
      marketplaceFee: 0,
      cardFee: 0,
      operationalCost: 0,
      commercialCost: 0,
      minimumPrice: 0,
      active: true
    });
    this.editar = false
  }

  get extras(): FormArray {

    return this.simulationForm.get(
      'extras'
    ) as FormArray;
  }

  addExtra(): void {

    this.extras.push(

      this.fb.group({

        name: [''],

        value: [0],

        multiplyByQuantity: [true]

      })

    );
  }
  removeExtra(index: number): void {

    this.extras.removeAt(index);

    this.simulate();
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