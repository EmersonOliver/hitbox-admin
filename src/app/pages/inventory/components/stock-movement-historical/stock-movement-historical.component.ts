import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StockMovementModel } from '../stock-modal/models/stock.movement.model';
import { InventarioService } from '../../../../core/inventario/inventario.service';
import { InventoryModel } from '../inventory-modal/models/inventory.model';
export interface StockMovementHistoricalModel {

  stockMovementId: number;

  type:
  | 'ENTRY'
  | 'OUTPUT'
  | 'LOSS'
  | 'ADJUSTMENT'
  | 'PRODUCTION_CONSUMPTION';

  quantity: number;

  unitCost: number;

  totalCost: number;

  observation: string;

  movementDate: string;

  createdBy?: string;
}

@Component({
  selector: 'app-stock-movement-historical',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './stock-movement-historical.component.html',
  styleUrl: './stock-movement-historical.component.scss'
})
export class StockMovementHistoricalComponent implements OnChanges {
  @Input()
  inventoryName?: string;

  @Input()
  inventorySelected?:
    InventoryModel | null = null;


  movements?: StockMovementModel[] = [];

  @Input()
  loading = false;

  @Input()
  currentPage = 0;

  @Input()
  totalPages = 0;

  @Output()
  changePage =
    new EventEmitter<number>();

  @Output()
  reload =
    new EventEmitter<void>();

  movementTypes: Record<string, any> = {

    ENTRY: {
      label: 'Entrada',
      icon: 'bi-arrow-down-circle',
      class: 'success'
    },

    OUTPUT: {
      label: 'Saída',
      icon: 'bi-arrow-up-circle',
      class: 'danger'
    },

    LOSS: {
      label: 'Perda',
      icon: 'bi-exclamation-triangle',
      class: 'warning'
    },

    ADJUSTMENT: {
      label: 'Ajuste',
      icon: 'bi-sliders',
      class: 'info'
    },

    PRODUCTION_CONSUMPTION: {
      label: 'Produção',
      icon: 'bi-box-seam',
      class: 'primary'
    }
  };
  constructor(private inventoryService: InventarioService) { }
  ngOnChanges(
    changes: SimpleChanges
  ): void {
    if (changes['inventorySelected']) {
      this.loadMovements();
    }
  }

  nextPage(): void {

    if (
      this.currentPage + 1 >=
      this.totalPages
    ) {
      return;
    }

    this.loadMovements(this.currentPage + 1)
  }

  previousPage(): void {

    if (
      this.currentPage <= 0
    ) {
      return;
    }

    this.loadMovements(this.currentPage - 1)

  }

  getMovementConfig(
    type: string
  ) {

    return this.movementTypes[type];
  }

  loadMovements(page = 0) {
    if (this.inventorySelected?.id)
      this.inventoryService
        .findMovements(
          this.inventorySelected?.id,
          page
        )
        .subscribe(response => {

          this.movements =
            response.content;

          this.currentPage =
            response.number;

          this.totalPages =
            response.totalPages;

        });
  }

}
