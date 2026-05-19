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
import { InventoryModalComponent } from "../components/inventory-modal/inventory-modal.component";
import { InventarioService } from '../../core/inventario/inventario.service';
import { InventoryModel } from '../components/inventory-modal/models/inventory.model';
import { UnitLabelPipe } from "../../core/pipe/unitlable.pipe";
import { ImageUtil } from '../../core/utils/image.util';
import { CategoriaService } from '../../core/categoria/categoria.service';
import { CategoriaModel } from '../categorias/model/categoria.model';
import { ToastService } from '../components/toast/toast.service';
import { ToastComponent } from "../components/toast/toast.component";

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
  selectedCategorias: number[] = [];

  toggleCategoria(id: number): void {

    const exists =
      this.selectedCategorias.includes(id);




    if (exists) {
      this.selectedCategorias =
        this.selectedCategorias
          .filter(c => c !== id);
      this.filterInventoryByCategorias();
      return;
    }
    this.selectedCategorias.push(id);
    this.filterInventoryByCategorias();
  }

  filterInventoryByCategorias() {
    this.inventoryService
      .getPage(
        this.currentPage - 1,
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

  currentPage = 1;
  pageSize = 5;
  totalPages = 0;
  totalElements = 0;

  search = '';
  inventory: InventoryModel[] = [];
  categorias: CategoriaModel[] = [];
  inventorySelecionado?:
    InventoryModel | null = null;

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

  get filteredInventory() {

    return this.inventory.filter(item =>
      item.name
        .toLowerCase()
        .includes(
          this.search.toLowerCase()
        )
    );
  }

  get paginatedInventory() {

    const start = (this.currentPage - 1) * this.pageSize;

    const end =
      start + this.pageSize;

    return this.filteredInventory.slice(
      start,
      end
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
    item: any
  ): number {

    const percentage =
      (
        item.quantity /
        (
          item.minimumStock * 2
        )
      ) * 100;

    return Math.min(
      percentage,
      100
    );
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

    return 'primary';
  }
  reloadInventory(): void {
    this.loadInventory();
  }
  loadInventory(): void {
    this.inventoryService
      .getPage(
        this.currentPage - 1,
        this.pageSize
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

  removerInventario(item: InventoryModel) {
    this.inventoryService.delete(item.id).subscribe({
      next: () => {
        this.toast.show('Excluído com sucesso!', 'success');
        this.loadInventory();
      }, error: (msg) => {
        this.toast.show('Ocorreu um erro! ' + msg.error.message, 'danger');
      }
    });
  }


}