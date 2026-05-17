import {
  Component
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-costs',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],

  templateUrl:
    './costs.component.html',

  styleUrl:
    './costs.component.scss'
})
export class CostsComponent {

  loading = false;

  currentPage = 1;

  pageSize = 5;

  search = '';

  costs = [

    {
      id: 1,
      name: 'PLA Preto',
      category: 'Material',
      unit: 'g',
      value: 0.12,
      calculationType: 'PER_GRAM',
      active: true
    },

    {
      id: 2,
      name: 'Energia Impressora',
      category: 'Energia',
      unit: 'h',
      value: 0.48,
      calculationType: 'PER_HOUR',
      active: true
    },

    {
      id: 3,
      name: 'Mão de obra',
      category: 'Serviço',
      unit: 'h',
      value: 15,
      calculationType: 'PER_HOUR',
      active: true
    }
  ];

  categories = [
    'Material',
    'Energia',
    'Serviço',
    'Marketplace',
    'Frete',
    'Embalagem'
  ];

  calculationTypes = [

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
    },

    {
      label: 'Fixo',
      value: 'FIXED'
    }
  ];

  units = [
    'g',
    'kg',
    'h',
    'un'
  ];

  form = this.fb.group({

    name: [
      '',
      Validators.required
    ],

    category: [
      '',
      Validators.required
    ],

    unit: [
      '',
      Validators.required
    ],

    value: [0],

    calculationType: [
      'FIXED'
    ],

    active: [true]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  get filteredCosts() {

    return this.costs.filter(cost =>
      cost.name
        .toLowerCase()
        .includes(
          this.search.toLowerCase()
        )
    );
  }

  get paginatedCosts() {

    const start =
      (
        this.currentPage - 1
      ) * this.pageSize;

    const end =
      start + this.pageSize;

    return this.filteredCosts.slice(
      start,
      end
    );
  }

  get totalPages() {

    return Math.ceil(
      this.filteredCosts.length /
      this.pageSize
    );
  }

  changePage(
    page: number
  ): void {

    if (
      page < 1
      ||
      page > this.totalPages
    ) {
      return;
    }

    this.currentPage = page;
  }

  submit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.loading = true;

    setTimeout(() => {

      this.loading = false;

      this.form.reset({
        calculationType: 'FIXED',
        active: true
      });

    }, 800);
  }
}