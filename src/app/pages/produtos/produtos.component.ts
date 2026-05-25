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
import { ProductService } from '../../core/product/product.service';
declare var bootstrap: any;

declare var $: any;
@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ProdutoModalComponent, ToastComponent],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent implements OnInit {
  sendToProduction(_t53: ProductResponse) {
    throw new Error('Method not implemented.');
  }
  openProductionHistory(_t53: ProductResponse) {
    throw new Error('Method not implemented.');
  }

  search = '';
  categorias: CategoriaModel[] = []
  products: ProductResponse[] = []
  produtoSelecionado!: ProductResponse;
  sortField = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage = 1;
  pageSize = 5;
  totalPages = 0;
  totalElements = 0;
  selectedImagePreview?: string;
  selectedCategorias: number[] = [];

  constructor(private title: Title,
    private toast: ToastService,
    private categoriaService: CategoriaService,
    private productService: ProductService
  ) {
    title.setTitle('Hitbox - Produtos')
  }
  ngOnInit(): void {
    this.loadCategoriasFiltro();
    this.loadProductsPage();
  }

  loadProductsPage() {
    this.productService.page(
      this.currentPage - 1,
      this.pageSize,
      this.selectedCategorias,
      this.sortField,
      this.sortDirection).subscribe({
        next: res => {
          this.products = res.content;

          this.totalPages =
            res.totalPages;

          this.totalElements =
            res.totalElements;
        }
      })
  }
  getCategoriasSelecionadasLabel(): string {
    if (
      this.selectedCategorias.length === 0
    ) {
      return 'Todas categorias';
    }
    return this.categorias
      .filter(c =>
        c.id !== undefined
        &&
        this.selectedCategorias.includes(c.id)
      )
      .map(c => c.nome)
      .join(', ');
  }

  toggleCategoria(id: number): void {

    const exists =
      this.selectedCategorias.includes(id);

    if (exists) {
      this.selectedCategorias =
        this.selectedCategorias
          .filter(c => c !== id);
    } else {
      this.selectedCategorias.push(id);
    }
    this.currentPage = 1;
    this.loadProductsPage();
  }
  resolveImage(
    path?: string
  ): string {

    return ImageUtil.resolve(
      path
    );
  }

  loadCategoriasFiltro() {
    this.categoriaService.loadCategoriasByParametro('VENDA').subscribe({
      next: response => {
        this.categorias = response;
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
    this.loadProductsPage();
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

  openImageModal(
    image?: string
  ): void {

    if (!image) {
      return;
    }

    this.selectedImagePreview =
      this.resolveImage(image);

    const modal =
      new bootstrap.Modal(
        document.getElementById(
          'productImageModal'
        )
      );

    modal.show();
  }


}
