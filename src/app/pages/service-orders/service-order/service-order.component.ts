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

import {
  Router
} from '@angular/router';
import { ServiceOrderResponse } from '../models/response/service-order-response.model';
import { ServiceOrderService } from '../../../core/service-order/service-order.service';
import { ModalServiceOrderComponent } from '../components/modals/modal-service-order/modal-service-order.component';
import { ModalServiceViewerComponent } from '../components/modals/modal-service-viewer/modal-service-viewer.component';


declare var bootstrap: any;

@Component({
  selector: 'app-service-order',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalServiceOrderComponent,
    ModalServiceViewerComponent
  ],
  templateUrl: './service-order.component.html',
  styleUrls: ['./service-order.component.scss']
})
export class ServiceOrderComponent implements OnInit {

  orders: ServiceOrderResponse[] = [];

  filteredOrders: ServiceOrderResponse[] = [];

  selectedOrder?: ServiceOrderResponse;

  loading = false;

  searching = false;

  currentPage = 1;

  pageSize = 10;

  totalPages = 0;

  searchText = '';

  selectedStatus = '';

  startDate = '';

  endDate = '';

  statusOptions = [
    'OPEN',
    'IN_PRODUCTION',
    'PARTIALLY_FINISHED',
    'FINISHED',
    'DELIVERED',
    'CANCELED'
  ];

  constructor(
    private serviceOrderService: ServiceOrderService,
    private router: Router
  ) { }


  ngOnInit(): void {

    this.loadOrders();
  }


  loadOrders(): void {

    this.loading = true;

    this.serviceOrderService
      .findAll()
      .subscribe({

        next: response => {

          this.orders =
            response.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );

          this.filteredOrders =
            [...this.orders];

          this.calculatePagination();

          this.loading = false;
        },

        error: () => {

          this.loading = false;
        }
      });
  }

  applyFilters(): void {

    let result =
      [...this.orders];

    if (this.searchText.trim()) {

      const search =
        this.searchText.toLowerCase();

      result =
        result.filter(order =>
          order.clienteName
            ?.toLowerCase()
            .includes(search)
          ||
          order.id
            .toString()
            .includes(search)
        );
    }

    if (this.selectedStatus) {

      result =
        result.filter(order =>
          order.status ===
          this.selectedStatus
        );
    }

    if (this.startDate) {

      const start =
        new Date(this.startDate);

      result =
        result.filter(order =>
          new Date(order.createdAt) >= start
        );
    }

    if (this.endDate) {

      const end =
        new Date(this.endDate);

      end.setHours(23, 59, 59, 999);

      result =
        result.filter(order =>
          new Date(order.createdAt) <= end
        );
    }

    this.filteredOrders =
      result;

    this.currentPage = 1;

    this.calculatePagination();
  }

  clearFilters(): void {

    this.searchText = '';

    this.selectedStatus = '';

    this.startDate = '';

    this.endDate = '';

    this.filteredOrders =
      [...this.orders];

    this.calculatePagination();
  }

  calculatePagination(): void {

    this.totalPages =
      Math.ceil(
        this.filteredOrders.length /
        this.pageSize
      );
  }

  get paginatedOrders(): ServiceOrderResponse[] {

    const start =
      (this.currentPage - 1) *
      this.pageSize;

    const end =
      start + this.pageSize;

    return this.filteredOrders.slice(
      start,
      end
    );
  }

  nextPage(): void {

    if (
      this.currentPage <
      this.totalPages
    ) {

      this.currentPage++;
    }
  }

  previousPage(): void {

    if (
      this.currentPage > 1
    ) {

      this.currentPage--;
    }
  }

  openCreateModal(): void {

    const modal =
      new bootstrap.Modal(
        document.getElementById(
          'serviceOrderModal'
        )
      );

    modal.show();
  }

  openViewModal(
    order: ServiceOrderResponse
  ): void {

    this.selectedOrder = order;

    const modal =
      new bootstrap.Modal(
        document.getElementById(
          'serviceViewerModal'
        )
      );

    modal.show();
  }

  editOrder(
    order: ServiceOrderResponse
  ): void {

    this.selectedOrder = order;

    const modal =
      new bootstrap.Modal(
        document.getElementById(
          'serviceOrderModal'
        )
      );

    modal.show();
  }

  deleteOrder(
    orderId: number
  ): void {

    const confirmDelete =
      confirm(
        'Deseja remover esta ordem de serviço?'
      );

    if (!confirmDelete) {
      return;
    }

    this.serviceOrderService
      .delete(orderId)
      .subscribe({
        next: () => {
          this.loadOrders();
        }
      });
  }

  goToKanban(
    order: ServiceOrderResponse
  ): void {

    this.router.navigate(
      ['/production'],
      {
        queryParams: {
          orderId: order.id
        }
      }
    );
  }

  getStatusClass(
    status: string
  ): string {

    switch (status) {

      case 'OPEN':
        return 'status-open';

      case 'IN_PRODUCTION':
        return 'status-production';

      case 'PARTIALLY_FINISHED':
        return 'status-partial';

      case 'FINISHED':
        return 'status-finished';

      case 'DELIVERED':
        return 'status-delivered';

      case 'CANCELED':
        return 'status-canceled';

      default:
        return '';
    }
  }

  formatCurrency(
    value: number
  ): string {

    return new Intl.NumberFormat(
      'pt-BR',
      {
        style: 'currency',
        currency: 'BRL'
      }
    ).format(value || 0);
  }

  formatDate(
    date: Date
  ): string {

    return new Intl.DateTimeFormat(
      'pt-BR'
    ).format(new Date(date));
  }
}