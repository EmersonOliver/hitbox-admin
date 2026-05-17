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
  selector: 'app-pricing-catalog',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],

  templateUrl:
    './pricing-catalog.component.html',

  styleUrl:
    './pricing-catalog.component.scss'
})
export class PricingCatalogComponent {

  loading = false;

  currentPage = 1;

  pageSize = 5;

  search = '';

  catalogs = [

    {
      id: 1,
      name: 'Varejo',
      marketplace: 'Loja Física',
      margin: 35,
      fee: 0,
      shipping: 0,
      active: true
    },

    {
      id: 2,
      name: 'Shopee',
      marketplace: 'Shopee',
      margin: 45,
      fee: 18,
      shipping: 5,
      active: true
    },

    {
      id: 3,
      name: 'Mercado Livre',
      marketplace: 'Mercado Livre',
      margin: 50,
      fee: 22,
      shipping: 7,
      active: true
    }
  ];

  marketplaces = [
    'Loja Física',
    'Shopee',
    'Mercado Livre',
    'Amazon',
    'Site'
  ];

  form = this.fb.group({

    name: [
      '',
      Validators.required
    ],

    marketplace: [
      '',
      Validators.required
    ],

    margin: [0],

    fee: [0],

    shipping: [0],

    active: [true]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  get filteredCatalogs() {

    return this.catalogs.filter(catalog =>
      catalog.name
        .toLowerCase()
        .includes(
          this.search.toLowerCase()
        )
    );
  }

  get paginatedCatalogs() {

    const start =
      (
        this.currentPage - 1
      ) * this.pageSize;

    const end =
      start + this.pageSize;

    return this.filteredCatalogs.slice(
      start,
      end
    );
  }

  get totalPages() {

    return Math.ceil(
      this.filteredCatalogs.length /
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

      this.form.reset({
        active: true
      });

      this.loading = false;

    }, 800);
  }
}