import {
  Component,
  Input,
  OnChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-produtos-historico-producao-modal',
  standalone: true,
  imports: [CommonModule,
    FormsModule],
  templateUrl: './produtos-historico-producao-modal.component.html',
  styleUrl: './produtos-historico-producao-modal.component.scss'
})
export class ProdutosHistoricoProducaoModalComponent implements OnChanges{
 @Input()
  history: any[] = [];

  search: string = '';

  selectedStatus: string = '';

  pageSize: number = 5;

  currentPage: number = 1;

  filteredHistory: any[] = [];

  paginatedHistory: any[] = [];

  totalPages: number = 1;

  ngOnChanges(): void {

    this.applyFilters();
  }

  applyFilters(): void {

    this.filteredHistory =
      this.history.filter(item => {

        const matchesSearch =
          !this.search ||
          item.productName?.toLowerCase()
            .includes(this.search.toLowerCase());

        const matchesStatus =
          !this.selectedStatus ||
          item.status === this.selectedStatus;

        return matchesSearch && matchesStatus;
      });

    this.totalPages =
      Math.max(
        1,
        Math.ceil(this.filteredHistory.length / this.pageSize)
      );

    if (this.currentPage > this.totalPages) {

      this.currentPage = 1;
    }

    this.updatePagination();
  }

  updatePagination(): void {

    const start =
      (this.currentPage - 1) * this.pageSize;

    const end =
      start + this.pageSize;

    this.paginatedHistory =
      this.filteredHistory.slice(start, end);
  }

  changePage(page: number): void {

    if (
      page < 1 ||
      page > this.totalPages
    ) {
      return;
    }

    this.currentPage = page;

    this.updatePagination();
  }

  changePageSize(): void {

    this.currentPage = 1;

    this.applyFilters();
  }
}
