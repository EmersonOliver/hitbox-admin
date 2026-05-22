import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ProdutoModalComponent } from "./components/produto-modal/produto-modal.component";
import { ToastComponent } from "../components/toast/toast.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriaModel } from '../categorias/model/categoria.model';
import { ProductResponse } from './components/produto-modal/models/produto.model';
import { CategoriaService } from '../../core/categoria/categoria.service';
import { ToastService } from '../components/toast/toast.service';
import { ImageUtil } from '../../core/utils/image.util';
import { InventoryModalComponent } from '../inventory/components/inventory-modal/inventory-modal.component';
declare var bootstrap: any;

declare var $: any;
@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, InventoryModalComponent, FormsModule, ReactiveFormsModule, ProdutoModalComponent, ToastComponent],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent implements OnInit {

  search = '';
  categorias: CategoriaModel[] = []
  products: ProductResponse[] = []
  produtoSelecionado!: ProductResponse;

  currentPage = 1;
  pageSize = 5;
  totalPages = 0;
  totalElements = 0;


  constructor(private title: Title,
    private toast: ToastService,
    private categoriaService: CategoriaService
  ) {
    title.setTitle('Hitbox - Produtos')
  }
  ngOnInit(): void {
    this.loadCategoriasFiltro();
  }

  resolveImage(
    path?: string
  ): string {

    return ImageUtil.resolve(
      path
    );
  }

  loadCategoriasFiltro() {
    this.categoriaService.loadCategoriasWithouPages().subscribe({
      next: response => {
        this.categorias = response.content;
      }, error: (msg) => {
        this.toast.show('Ocorreu um erro ' + msg.error.message, 'danger');
      }
    })
  }

  openProductModal() {

    const modal =
      new bootstrap.Modal(
        document.getElementById(
          'productModal'
        )
      );
    modal.show();
  }
  removeProduct(_t66: any) {

  }
  editProduct(_t66: any) {

  }
  reloadProducts() {

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
    this.reloadProducts();
  }


}
