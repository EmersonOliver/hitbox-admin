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
    ReactiveFormsModule, ToastComponent],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss'
})
export class CategoriasComponent implements OnInit {

  loading = false;
  currentPage = 0;
  pageSize = 5;
  totalPages = 0;
  totalElements = 0;
  first = true;
  last = false;
  editar = false;

  categorias: CategoriaModel[] = [];
  categoriaSelecionada!: CategoriaModel;

  form!: FormGroup;


  constructor(
    private categoriaService: CategoriaService,
    private toastService: ToastService,
    private title: Title,
    private fb: FormBuilder
  ) {
    title.setTitle('Hitbox - Categorias')
    this.form = this.fb.group({
      nome: [null, Validators.required],
      descricao: [''],
      ativo: [true]
    });
  }


  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(): void {

    this.loading = true;
    console.log(this.currentPage)
    console.log(this.pageSize)
    this.categoriaService.loadCategorias(
      this.currentPage,
      this.pageSize
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
      page < 0 ||
      page >= this.totalPages
    ) {
      return;
    }

    this.currentPage = page;

    this.loadCategorias();
  }

  nextPage(): void {

    if (!this.last) {

      this.currentPage++;

      this.loadCategorias();
    }
  }

  previousPage(): void {
    if (!this.first) {
      this.currentPage--;
      this.loadCategorias();
    }
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

}
