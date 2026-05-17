// calc-pricing.component.ts

import {
  Component
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
export class CalcPricingComponent {

  activeTab =
    'rules';

  loading = false;

  previewResult = 0;
  currentPage = 1;
  pageSize = 5;
  search = '';

  selectedStatus = 'ALL';

  rules = [

    {
      id: 1,
      name: 'Chaveiro Comum',
      category: 'Chaveiros',
      type: 'PER_GRAM',
      basePrice: 5,
      pricePerGram: 0.12,
      active: true
    },

    {
      id: 2,
      name: 'Chaveiro Personalizado',
      category: 'Chaveiros',
      type: 'PER_GRAM',
      basePrice: 10,
      pricePerGram: 0.18,
      active: true
    }
  ];

  categories = [
    'Chaveiros',
    'Imãs',
    'Geek',
    'Personalizados'
  ];

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

      name: [
        '',
        Validators.required
      ],

      category: [
        '',
        Validators.required
      ],

      calculationType: [
        'FIXED'
      ],

      basePrice: [0],

      pricePerGram: [0],

      pricePerHour: [0],

      additionalPrice: [0],

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
    private title:Title,
    private fb: FormBuilder
  ) {
    title.setTitle('Hitbox - Cálculos')
    this.simulationForm
      .valueChanges
      .subscribe(() => {

        this.calculatePreview();
      });
  }

  calculatePreview(): void {

    const rule =
      this.rules[0];

    const values =
      this.simulationForm.value;

    let total =
      rule.basePrice;

    total +=
      (
        values.weight || 0
      ) * rule.pricePerGram;

    this.previewResult =
      total;
  }

  submit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.loading = true;

    setTimeout(() => {

      this.rules.unshift({

        id: this.rules.length + 1,

        ...this.form.getRawValue()
      });

      this.loading = false;

      this.form.reset({
        calculationType: 'FIXED',
        active: true
      });

    }, 800);
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