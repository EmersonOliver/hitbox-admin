import {
  Component
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss'
})
export class CategoriasComponent {

  loading = false;
  currentPage = 1;
  pageSize = 5;

  categories = [

    {
      id: 1,
      name: 'Chaveiros',
      description: 'Produtos impressos 3D',
      active: true
    },

    {
      id: 2,
      name: 'Geek',
      description: 'Produtos geeks',
      active: true
    },

    {
      id: 3,
      name: 'Papelaria',
      description: 'Itens personalizados',
      active: false
    },

    {
      id: 4,
      name: 'Colecionáveis',
      description: 'Miniaturas',
      active: true
    },

    {
      id: 5,
      name: 'Acessórios',
      description: 'Itens extras',
      active: true
    },

    {
      id: 6,
      name: 'Switches',
      description: 'Teclado mecânico',
      active: true
    }
  ];

  form = this.fb.group({

    name: [
      '',
      Validators.required
    ],

    description: [''],

    active: [true]
  });

  constructor(
    private title:Title,
    private fb: FormBuilder
  ) { 
    title.setTitle('Hitbox - Categorias')
  }

  /* ======================================================
    PAGINATION
 ====================================================== */

  get paginatedCategories() {

    const start =
      (
        this.currentPage - 1
      ) * this.pageSize;

    const end =
      start + this.pageSize;

    return this.categories.slice(
      start,
      end
    );
  }

  get totalPages(): number {

    return Math.ceil(
      this.categories.length /
      this.pageSize
    );
  }

  changePage(
    page: number
  ): void {

    if (
      page < 1 ||
      page > this.totalPages
    ) {
      return;
    }

    this.currentPage = page;
  }

  /* ======================================================
     SUBMIT
  ====================================================== */

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
