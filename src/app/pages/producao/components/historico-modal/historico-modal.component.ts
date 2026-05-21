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

@Component({
  selector: 'app-historico-modal',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl:
    './historico-modal.component.html',

  styleUrl:
    './historico-modal.component.scss'
})
export class HistoricoModalComponent implements OnInit {

  history: any[] = [];

  filteredHistory: any[] = [];

  paginatedHistory: any[] = [];

  search = '';

  selectedStatus = '';

  currentPage = 1;

  pageSize = 5;

  totalPages = 0;

  ngOnInit(): void {

    /*
     * MOCK BACKEND
     */

    this.history = [

      {
        product: 'Suporte Articulado',
        operator: 'Emerson',
        printer: 'Bambu Lab X1C',
        duration: '4h 12m',
        status: 'FINALIZADO',
        date: '16/05/2026 14:35'
      },

      {
        product: 'Case Raspberry',
        operator: 'Carlos',
        printer: 'Ender 3 V2',
        duration: '2h 45m',
        status: 'FINALIZADO',
        date: '16/05/2026 10:12'
      },

      {
        product: 'Engrenagem Técnica',
        operator: 'Lucas',
        printer: 'Bambu Lab P1S',
        duration: '1h 50m',
        status: 'FALHA',
        date: '15/05/2026 18:44'
      },

      {
        product: 'Organizador Modular',
        operator: 'Fernanda',
        printer: 'Bambu Lab X1C',
        duration: '6h 20m',
        status: 'FINALIZADO',
        date: '15/05/2026 09:22'
      },

      {
        product: 'Suporte Headset',
        operator: 'Emerson',
        printer: 'Creality K1',
        duration: '3h 05m',
        status: 'CANCELADO',
        date: '14/05/2026 17:11'
      },

      {
        product: 'Base Notebook',
        operator: 'Marcos',
        printer: 'Bambu Lab P1S',
        duration: '5h 31m',
        status: 'FINALIZADO',
        date: '14/05/2026 13:00'
      }
    ];

    this.applyFilters();
  }

  applyFilters(): void {

    this.currentPage = 1;

    this.filteredHistory =
      this.history.filter(item => {

        const matchesSearch =
          item.product
            .toLowerCase()
            .includes(
              this.search.toLowerCase()
            );

        const matchesStatus =
          !this.selectedStatus
          ||
          item.status === this.selectedStatus;

        return matchesSearch && matchesStatus;
      });

    this.updatePagination();
  }

  updatePagination(): void {

    this.totalPages =
      Math.ceil(
        this.filteredHistory.length /
        this.pageSize
      );

    const start =
      (this.currentPage - 1)
      * this.pageSize;

    const end =
      start + this.pageSize;

    this.paginatedHistory =
      this.filteredHistory.slice(
        start,
        end
      );
  }

  changePage(page: number): void {

    if (
      page < 1
      ||
      page > this.totalPages
    ) {
      return;
    }

    this.currentPage = page;

    this.updatePagination();
  }

  changePageSize(): void {

    this.currentPage = 1;

    this.updatePagination();
  }
}