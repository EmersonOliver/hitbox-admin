// calc-pricing.component.ts

import {
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
import { Title } from '@angular/platform-browser';
import { PricingEngineService } from '../../core/pricing/services/price-engine.service';
import { PricingRule } from '../../core/pricing/models/pricing-rule.model';
import { CalculationType } from '../../core/pricing/enums/calculation-type.enum';
import { PricingRuleService } from '../../core/pricing/services/pricing-rule.service';
import { ToastService } from '../components/toast/toast.service';
import { CategoriaModel } from '../categorias/model/categoria.model';
import { CategoriaService } from '../../core/categoria/categoria.service';
import { PricingRuleResponse } from './models/pricing.rules.response';

@Component({
  selector: 'app-calc-pricing',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],

  templateUrl:
    './calc-pricing.component.html',

  styleUrl:
    './calc-pricing.component.scss'
})
export class CalcPricingComponent implements OnInit {

  activeTab =
    'rules';

  loading = false;

  previewResult = 0;
  currentPage = 1;
  pageSize = 5;
  search = '';

  selectedStatus = 'ALL';

  rules: PricingRuleResponse[] = [];

  categories: CategoriaModel[] = [];

  calculationTypes = [

    {
      label: 'Preço fixo',
      value: 'FIXED'
    },

    {
      label: 'Por grama',
      value: 'PER_GRAM'
    },

    {
      label: 'Por hora',
      value: 'PER_HOUR'
    },

    {
      label: 'Por unidade',
      value: 'PER_UNIT'
    }
  ];

 form: FormGroup =
  this.fb.group({

    name: ['', Validators.required],

    categoriaId: [
      null as number | null,
      Validators.required
    ],
    calculationType: ['FIXED'],
    setupCost: [0],
    pricePerGram: [0],
    pricePerHour: [0],
    pricePerUnit: [0],
    additionalCost: [0],
    profitMargin: [0],
    marketplaceFee: [0],
    cardFee: [0],
    minimumPrice: [0],
    active: [true]
  });

  simulationForm =
    this.fb.group({

      weight: [0],

      quantity: [1],

      hours: [0]
    });

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private pringingRuleService: PricingRuleService,
    private categoriaService: CategoriaService,
    private pricingEngine: PricingEngineService,
    private toast: ToastService
  ) {
    title.setTitle('Hitbox - Cálculos')
    this.simulationForm
      .valueChanges
      .subscribe(() => {
        this.calculatePreview();
      });
  }
  ngOnInit(): void {
    this.loadRules();
    this.loadCategorias();
  }

  loadCategorias() {
    this.categoriaService.loadCategoriasWithouPages().subscribe({
      next: response => {
        this.categories = response.content;
      }, error: (error) => {
        this.toast.show('Ocorreu um erro ao carregar categorias ' + error.error.message, 'danger');
      }
    });
  }

  loadRules() {
    this.pringingRuleService.getPage(this.currentPage - 1,
      this.pageSize).subscribe({
        next: response => {
          this.rules = response.content;
        }, error: (error) => {
          this.toast.show('Ocorreu um erro ' + error.error.message, 'danger')
        }
      })
  }

  calculatePreview(): void {

    const rule =
      this.rules[0];

    this.previewResult =
      this.pricingEngine
        .calculate(
          rule,
          this.simulationForm.getRawValue()
        ).total;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    const payload =
      this.form.getRawValue();

    this.pringingRuleService
      .save(payload)
      .subscribe({
        next: response => {
          // this.rules.unshift(response);
          this.loading = false;
          this.form.reset({
            calculationType: 'FIXED',
            active: true
          });
        },
        error: () => {
          this.loading = false;
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
          && rule.active
        )
        ||
        (
          this.selectedStatus === 'INACTIVE'
          && !rule.active
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

    const end =
      start + this.pageSize;

    return this.filteredRules.slice(
      start,
      end
    );
  }

  get totalPages() {

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
}