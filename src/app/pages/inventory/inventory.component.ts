import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';
import { InventarioService } from '../../core/inventario/inventario.service';
import { UnitLabelPipe } from "../../core/pipe/unitlable.pipe";
import { ImageUtil } from '../../core/utils/image.util';
import { CategoriaService } from '../../core/categoria/categoria.service';
import { CategoriaModel } from '../categorias/model/categoria.model';
import { ToastService } from '../components/toast/toast.service';
import { ToastComponent } from "../components/toast/toast.component";
import { InventoryModalComponent } from './components/inventory-modal/inventory-modal.component';
import { InventoryModel } from './components/inventory-modal/models/inventory.model';

declare var bootstrap: any;

@Component({
  selector: 'app-inventory',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    InventoryModalComponent,
    UnitLabelPipe,
    ToastComponent
  ],

  templateUrl:
    './inventory.component.html',

  styleUrl:
    './inventory.component.scss'
})
export class InventoryComponent implements OnInit {

  sortField = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedCategorias: number[] = [];
  currentPage = 1;
  pageSize = 5;
  totalPages = 0;
  totalElements = 0;

  search = '';
  inventory: InventoryModel[] = [];
  categorias: CategoriaModel[] = [];
  inventorySelecionado?:
    InventoryModel | null = null;

  selectedImagePreview?: string;

  constructor(
    private inventoryService: InventarioService,
    private toast: ToastService,
    private categoriaService: CategoriaService) { }


  ngOnInit(): void {
    this.loadInventory()
    this.loadCategoriasFiltro();
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
    this.loadInventory();
  }

  openInventoryModal(): void {
    this.inventorySelecionado = null;

    const modal =
      new bootstrap.Modal(
        document.getElementById(
          'inventoryModal'
        )
      );
    modal.show();
  }

  selectInventoryEdit(item: InventoryModel): void {
    this.inventorySelecionado = item;
    const modal =
      new bootstrap.Modal(
        document.getElementById(
          'inventoryModal'
        )
      );
    modal.show();
  }

  getStockPercentage(
    item: InventoryModel
  ): number {

    if (!item.quantity || item.quantity <= 0) {
      return 0;
    }

    const percentage =
      (item.quantity / item.minimumStock) * 100;

    return Math.min(
      Math.max(percentage, 0),
      100
    );
  }
  getStockStatus(item: any): string {

    if (item.quantity <= 0) {
      return 'OUT';
    }

    if (item.quantity <= item.minimumStock) {
      return 'LOW';
    }

    return 'OK';
  }

  getStockVariant(
    item: any
  ): string {

    const percentage =
      this.getStockPercentage(item);

    if (percentage <= 30) {

      return 'danger';
    }

    if (percentage <= 60) {

      return 'warning';
    }

    return 'success';
  }

  reloadInventory(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.inventoryService
      .getPage(
        this.currentPage - 1,
        this.pageSize,
        this.selectedCategorias,
        this.sortField,
        this.sortDirection,
        this.search
      )
      .subscribe({

        next: (response) => {

          this.inventory =
            response.content;

          this.totalPages =
            response.totalPages;

          this.totalElements =
            response.totalElements;
        }
      });
  }

  resolveImage(
    path?: string
  ): string {

    return ImageUtil.resolve(
      path
    );
  }

  removerInventario(id?: number) {
    this.inventoryService.delete(id).subscribe({
      next: () => {
        this.toast.show('Excluído com sucesso!', 'success');
        this.loadInventory();
        this.inventorySelecionado = null;
      }, error: (msg) => {
        this.toast.show('Ocorreu um erro! ' + msg.error.message, 'danger');
      }
    });
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
    this.loadInventory();
  }

  filterInventoryByCategorias() {
    this.inventoryService
      .getPage(
        0,
        this.pageSize,
        this.selectedCategorias
      )
      .subscribe({

        next: (response) => {

          this.inventory =
            response.content;

          this.totalPages =
            response.totalPages;

          this.totalElements =
            response.totalElements;
        }
      });
  }

  abrirModalRemoveInventario(item: InventoryModel) {
    this.inventorySelecionado = item;
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

    this.loadInventory();
  }

  changePageSize(): void {

    this.currentPage = 1;

    this.loadInventory();
  }
  get pages(): number[] {

    return Array.from(
      { length: this.totalPages },
      (_, i) => i + 1
    );
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
          'inventoryImageModal'
        )
      );

    modal.show();
  }

}