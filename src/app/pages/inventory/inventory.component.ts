import {
  Component
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';
import { InventoryModalComponent } from "../components/inventory-modal/inventory-modal.component";

declare var bootstrap: any;

@Component({
  selector: 'app-inventory',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    InventoryModalComponent
],

  templateUrl:
    './inventory.component.html',

  styleUrl:
    './inventory.component.scss'
})
export class InventoryComponent {

  currentPage = 1;

  pageSize = 5;

  search = '';

  inventory = [

    {
      id: 1,
      image: 'assets/img/inventario/filmento_amarelo.jpg',
      name: 'PLA Amarelo',
      category: 'Filamento',
      quantity: 950,
      minimumStock: 300,
      unit: 'g',
      location: 'A-01',
      supplier: '3D Lab',
      cost: 0.12,
      active: true
    },

    {
      id: 2,
      image: 'assets/img/inventario/click.webp',
      name: 'Switch Azul',
      category: 'Acessório',
      quantity: 25,
      minimumStock: 50,
      unit: 'un',
      location: 'B-02',
      supplier: 'KeyTech',
      cost: 2.5,
      active: true
    },

    {
      id: 3,
      image: 'assets/img/inventario/correntinha.webp',
      name: 'Corrente metálica',
      category: 'Acessório',
      quantity: 120,
      minimumStock: 40,
      unit: 'un',
      location: 'B-05',
      supplier: 'Metal Shop',
      cost: 0.85,
      active: true
    }
  ];

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

    const start =
      (
        this.currentPage - 1
      ) * this.pageSize;

    const end =
      start + this.pageSize;

    return this.filteredInventory.slice(
      start,
      end
    );
  }

  get totalPages() {

    return Math.ceil(
      this.filteredInventory.length /
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

  openInventoryModal(): void {

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
}