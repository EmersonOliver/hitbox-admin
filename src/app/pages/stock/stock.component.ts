import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CategoriaModel } from '../categorias/model/categoria.model';
import { InventoryModel } from '../inventory/components/inventory-modal/models/inventory.model';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss'
})
export class StockComponent implements OnInit {

  inventory: InventoryModel[] = [];

  categorias: CategoriaModel[] = [];

  search = '';

  selectedCategory = '';

  stockFilter = '';

  sortBy = 'name';

  currentPage = 1;

  totalPages = 1;

  ngOnInit(): void {

    this.loadInventory();

    this.loadCategorias();
  }

  loadInventory(): void {

    /*
     * TODO:
     * chamar service
     */
  }

  loadCategorias(): void {

    /*
     * TODO:
     * chamar service
     */
  }

  openStockModal(): void {

    /*
     * TODO:
     * abrir modal
     */
  }

  editInventory(
    item: InventoryModel
  ): void {

    console.log(item);
  }

  removeInventory(
    item: InventoryModel
  ): void {

    console.log(item);
  }

  changePage(
    page: number
  ): void {

    if (page <= 0 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;
  }

  getUnitCost(
    item: InventoryModel
  ): number {

    if (!item.quantity || item.quantity <= 0) {
      return 0;
    }

    if (!item.cost || item.cost <= 0) {
      return 0;
    }

    return item.cost / item.quantity;
  }

  resolveImage(
    imageUrl?: string
  ): string {

    if (!imageUrl) {

      return 'assets/images/no-image.png';
    }

    return imageUrl;
  }
}