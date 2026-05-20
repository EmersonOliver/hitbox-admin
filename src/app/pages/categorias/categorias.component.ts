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
import { CategoriaService } from '../../core/categoria/categoria.service';
import { CategoriaModel } from './model/categoria.model';
import { ToastComponent } from "../components/toast/toast.component";
import { ToastService } from '../components/toast/toast.service';
@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule, ToastComponent],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss'
})
export class CategoriasComponent implements OnInit {

  sortField = 'nome';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage = 1;
  pageSize = 5;
  totalPages = 0;
  totalElements = 0;
  search = '';
  loading = false;
  first = true;
  last = false;
  editar = false;

  categorias: CategoriaModel[] = [];
  categoriaSelecionada!: CategoriaModel;
  tipoCategoria = [
    {
      value: 'INSUMO',
      label: 'Insumo'
    },
    {
      value: 'OPERACIONAL',
      label: 'Operacional'
    },
    {
      value: 'VENDA',
      label: 'Venda'
    }
  ]

  form!: FormGroup;


  constructor(
    private categoriaService: CategoriaService,
    private toastService: ToastService,
    public title: Title,
    private fb: FormBuilder
  ) {
    title.setTitle('Hitbox - Categorias')
    this.form = this.fb.group({
      nome: [null, Validators.required],
      tipo: [null, Validators.required],
      descricao: [''],
      ativo: [true]
    });
  }


  ngOnInit(): void {
    this.loadCategorias();
  }

  getCategoria(tipo: string) {
    let tipoCategoria = this.tipoCategoria.find(i => i.value === tipo)?.label;
    console.log(tipoCategoria)
    return tipoCategoria;
  }

  loadCategorias(): void {
    this.loading = true;

    this.categoriaService.loadCategorias(
      this.currentPage - 1,
      this.pageSize,
      this.sortField,
      this.sortDirection,
      this.search
    ).subscribe({
      next: response => {

        this.categorias =
          response.content;

        this.totalPages =
          response.totalPages;

        this.totalElements =
          response.totalElements;

        this.first =
          response.first;

        this.last =
          response.last;

        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  /* ======================================================
    PAGINATION
 ====================================================== */

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
    this.loadCategorias();
  }

  sort(field: string): void {

    if (
      this.sortField === field
    ) {

      this.sortDirection =
        this.sortDirection === 'asc'
          ? 'desc'
          : 'asc';

    } else {

      this.sortField = field;

      this.sortDirection = 'asc';
    }

    this.currentPage = 1;

    this.loadCategorias();
  }

  changePageSize(): void {

    this.currentPage = 1;

    this.loadCategorias();
  }
  get pages(): number[] {

    return Array.from(
      { length: this.totalPages },
      (_, i) => i + 1
    );
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

      let payload: CategoriaModel = {
        nome: this.form.get('nome')?.value,
        tipo: this.form.get('tipo')?.value,
        descricao: this.form.get('descricao')?.value,
        ativo: this.form.get('ativo')?.value
      }

      if (this.editar && this.categoriaSelecionada.id) {
        this.categoriaService.editarCategoria(this.categoriaSelecionada.id, payload).subscribe({
          next: response => {
            this.toastService.show(
              'Categoria editada com sucesso',
              'success'
            );
            this.loadCategorias();
            this.editar = false;
            this.form.reset({
              ativo: true
            });
          },
          error: (msg) => {
            this.loading = false;
            this.toastService.show(
              msg.error.message,
              'danger'
            );
          }
        });
        return;
      }

      this.categoriaService.salvarCategoria(payload).subscribe({
        next: response => {
          this.toastService.show(
            'Categoria salva com sucesso',
            'success'
          );
          this.loadCategorias();
        }, error: (msg) => {
          this.loading = false;
          this.toastService.show(
            msg.error.message,
            'danger'
          );
        }
      });
      this.form.reset({
        ativo: true
      });
      this.loading = false;
    }, 800);
  }

  selecionarCategoria(categoria: CategoriaModel) {
    this.categoriaSelecionada = categoria;
    this.editar = true;
    this.form.patchValue({
      id: categoria.id,
      nome: categoria.nome,
      tipo: categoria.tipo,
      descricao: categoria.descricao,
      ativo: categoria.ativo
    });
  }

  catchCategoria(categoria: CategoriaModel) {
    this.categoriaSelecionada = categoria;
  }
  removerCategoria(categoria: CategoriaModel) {
    if (categoria.id)
      this.categoriaService.removerCategoria(categoria.id).subscribe({
        next: response => {
          this.toastService.show(
            'Categoria removida com sucesso',
            'success'
          );
          this.loadCategorias();
        },
        error: (msg) => {
          this.toastService.show(
            msg.error.message,
            'danger'
          );
        }
      })
  }
  descartarAlteracoes() {
    this.form.reset({
      ativo: true
    });
    this.categoriaSelecionada = {} as CategoriaModel;
    this.editar = false
    this.toastService.show('Alterações descartadas!', 'info')
  }

}
