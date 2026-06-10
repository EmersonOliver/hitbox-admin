import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { KanbanColumnResponse } from './models/response/kanban.column.response';
import { KanbanColumnService } from '../../../../core/kanban/kanban-column.service';
import { KanbanCardResponse } from './models/response/kanban.card.response';
import { KanbanCardService } from '../../../../core/kanban/kanban-card.service';
import { KanbanCardMovementService } from '../../../../core/kanban/kanban-card-movement.service';
import { ClienteService } from '../../../../core/cliente/cliente.service';
import { ClienteResponse } from '../../../clientes/models/cliente.response';
import { ToastService } from '../../../components/toast/toast.service';
import { ProductService } from '../../../../core/product/product.service';
import { ProductResponse } from '../../../produtos/components/produto-modal/models/produto.model';
import { ServiceOrderService } from '../../../../core/service-order/service-order.service';
import { ServiceOrderResponse } from '../../../service-orders/models/response/service-order-response.model';
import { FormatProductionTime } from '../../../../core/utils/production.time.utils';
import { KanbanCardRequest } from './models/request/kanban.card.request';
import { forkJoin } from 'rxjs';
declare var bootstrap: any;
@Component({
  selector: 'app-production-kanban',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './production-kanban.component.html',
  styleUrls: ['./production-kanban.component.scss']
})
export class ProductionKanbanComponent implements OnInit {

  columnName = '';
  typeColumn: string = '';
  columns: KanbanColumnResponse[] = [];
  loading: boolean = false;

  availableColors: string[] = [
    '#8b5cf6', // roxo
    '#3b82f6', // azul
    '#10b981', // verde
    '#f59e0b', // amarelo
    '#ef4444', // vermelho
    '#ec4899', // rosa
    '#14b8a6', // teal
    '#f97316', // laranja
    '#6366f1', // indigo
    '#64748b'  // slate
  ];

  selectedColumnColor: string = '#8b5cf6';
  selectedCard!: KanbanCardResponse;
  clientes: ClienteResponse[] = []
  products: ProductResponse[] = []
  ordersComboOpen: ServiceOrderResponse[] = []
  formCard: FormGroup;
  columnsTypes = [
    { id: 'OPEN', label: 'Aberto' },
    { id: 'IN_PRODUCTION', label: 'Em Produção' },
    { id: 'PARTIALLY_FINISHED', label: 'Em Montagem' },
    { id: 'FINISHED', label: 'Finalizado' },
    { id: 'DELIVERED', label: 'Entregue' },
    { id: 'CANCELED', label: 'Cancelado' }
  ];

  serviceOrderSelected?: ServiceOrderResponse;
  constructor(private columnService: KanbanColumnService,
    private cardService: KanbanCardService,
    private movementService: KanbanCardMovementService,
    private clienteService: ClienteService,
    private productService: ProductService,
    private orderService: ServiceOrderService,
    private fb: FormBuilder,
    private toast: ToastService) {

    this.formCard = this.fb.group({
      serviceOrderId: [null, Validators.required],
      itemProductId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(0.01)]],
      clienteId: [null, Validators.required],
      productionProgress: [0],
      estimatedMinutes: [null],
      blocked: [false],
      blockedReason: [null],
      notes: [null],
      kanbanColumnId: [null]

    })
  }

  ngOnInit(): void {
    this.carregarOrdemServicoByStatus('OPEN');
    this.loadKanban();
    this.carregarCliente();
  }

  carregarCliente() {
    this.clienteService.findAll().subscribe({
      next: res => {
        this.clientes = res;
      },
      error: (error) => {
        this.toast.show('Ocorreu um erro ao carregar os clientes! ' + error.error.message, 'danger');
      }
    })
  }

  carregarOrdemServicoByStatus(status?: string) {
    this.orderService.findByStatus(status).subscribe({
      next: res => {
        this.ordersComboOpen = res;
        this.changeOrder();
      }
    });
  }


  changeOrder() {
    this.serviceOrderSelected = this.ordersComboOpen.find(r => r.id == this.formCard.get('serviceOrderId')?.value);
    this.formCard.patchValue({
      clienteId: this.serviceOrderSelected?.clienteId
    });

  }

  carregarProdutos() {
    this.productService.findAll().subscribe({
      next: res => {
        this.products = res;
      }, error: (error) => {
        this.toast.show('Ocorreu um erro ao carregar produtos! ' + error.error.message, 'danger')
      }
    });
  }

  loadKanban(): void {

    this.loading = true;
    this.columnService
      .findAll()
      .subscribe({
        next: response => {
          this.columns =
            response.sort(
              (a, b) =>
                a.columnOrder - b.columnOrder
            );
          this.loading = false;
        },

        error: () => {
          this.loading = false;
        }
      });
  }

  drop(
    event: CdkDragDrop<KanbanCardResponse[]>,
    targetColumn: KanbanColumnResponse
  ): void {
    if (
      event.previousContainer ===
      event.container
    ) {

      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.updateCardOrders(
        targetColumn
      );

      return;
    }
    const previousColumn =
      this.columns.find(
        column =>
          column.id ===
          Number(event.previousContainer.id.replace('column-', ''))
      );
    if (!previousColumn) {
      return;
    }

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    const movedCard =
      event.container.data[
      event.currentIndex
      ];


    movedCard.kanbanColumnId =
      targetColumn.id;

    movedCard.cardOrder =
      event.currentIndex;

    const payload = {
      id: movedCard.id,

      itemProductId:
        movedCard.itemProductId,

      clienteId:
        movedCard.clienteId,

      serviceOrderId:
        movedCard.serviceOrderId,

      kanbanColumnId:
        targetColumn.id,

      cardOrder:
        movedCard.cardOrder,

      productionProgress:
        this.calculateProgressByColumn(targetColumn.id),

      estimatedMinutes:
        movedCard.estimatedMinutes,

      blocked:
        movedCard.blocked,

      blockedReason:
        movedCard.blockedReason,

      notes:
        movedCard.notes,

      quantity:
        movedCard.quantity,
      status:
        movedCard.status
    }

    this.cardService.update(payload)
      .subscribe({
        next: updated => {

          const index =
            targetColumn.cards.findIndex(
              c => c.id === updated.id
            );

          if (index >= 0) {

            targetColumn.cards[index] =
              updated;

            targetColumn.cards =
              [...targetColumn.cards];
          }
        }
      });

    this.movementService.create({
      cardId:
        movedCard.id,

      serviceOrderId:
        movedCard.serviceOrderId,

      fromColumnId:
        previousColumn.id,

      toColumnId:
        targetColumn.id

    }).subscribe();

    this.updateCardOrders(
      previousColumn
    );

    this.updateCardOrders(
      targetColumn
    );
  }

  osTemplate(value: any): string {
    return String(value).padStart(4, '0');
  }

  openModalColumn(): void {
    const modal =
      new bootstrap.Modal(
        document.getElementById(
          'createColumnModal'
        )
      );
    modal.show();
  }

  addColumn(): void {

    if (!this.columnName.trim()) {
      return;
    }

    this.columnService.create({
      columnName: this.columnName,
      columnColor: this.selectedColumnColor,
      columnOrder: this.columns.length,
      typeColumn: this.typeColumn
    }).subscribe({

      next: response => {

        this.columns.push({
          ...response,
          cards: []
        });

        this.columnName = '';
        this.selectedColumnColor = '#8b5cf6';
      }
    });
  }

  removeColumn(columnId: number): void {
    this.columnService
      .delete(columnId)
      .subscribe({

        next: () => {

          this.columns =
            this.columns.filter(
              c => c.id !== columnId
            );
        }
      });
  }

  get connectedDropListsIds(): string[] {
    return this.columns.map(
      column => `column-${column.id}`
    );
  }

  editColumn(column: KanbanColumnResponse): void {

    const newName =
      prompt(
        'Novo nome',
        column.columnName
      );

    if (!newName) {
      return;
    }

    this.columnService.update({

      id: column.id,
      columnName: newName,
      columnColor: column.columnColor,
      columnOrder: column.columnOrder,
      typeColumn: column.typeColumn

    }).subscribe({

      next: updated => {

        column.columnName =
          updated.columnName;
      }
    });
  }

  addCard(): void {

    if (!this.columns.length) {
      return;
    }

    const newCard: KanbanCardResponse = {

      id: 0,
      itemProductId: 0,
      clienteId: '',
      serviceOrderId: 0,
      kanbanColumnId:
        this.columns[0].id,

      cardOrder:
        this.columns[0].cards.length,

      productionProgress: 0,
      estimatedMinutes: 0,
      actualMinutes: 0,
      blocked: false,
      blockedReason: '',
      notes: '',
      startDatetime: new Date(),
      finishDatetime: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      productName: '',
      productImage: '',
      clientName: '',
      quantity: 1,
      status: 'OPEN'
    };

    this.editCard(newCard);
  }

  openCard(card: any): void {

    console.log(card);
  }
  updateCardOrders(
    column: KanbanColumnResponse
  ): void {

    column.cards.forEach(
      (card, index) => {

        card.cardOrder = index;
        const payload = {
          id: card.id,
          itemProductId: card.itemProductId,
          serviceOrderId: card.serviceOrderId,
          kanbanColumnId: card.kanbanColumnId,
          cardOrder: index,
          productionProgress:
            this.calculateProgressByColumn(column.id),
          estimatedMinutes:
            card.estimatedMinutes,
          blocked:
            card.blocked,
          blockedReason:
            card.blockedReason,
          notes:
            card.notes,
          clienteId: card.clienteId,
          quantity:
            card.quantity,
          status:
            card.status
        }

        this.cardService.update(payload).subscribe();
      }
    );
  }


  editCard(card: KanbanCardResponse): void {

    this.selectedCard = card;

    if (card.serviceOrderId != 0)
      this.orderService.findById(card.serviceOrderId).subscribe({
        next: res => {

          this.carregarOrdemServicoByStatus(res.status);
          this.formCard.patchValue({
            serviceOrderId: card.serviceOrderId,
            itemProductId: card.itemProductId,
            quantity: card.quantity,
            clienteId: card.clienteId,
            productionProgress: card.productionProgress || 0,
            estimatedMinutes: FormatProductionTime.formatHoursToDuration(card.estimatedMinutes),
            blocked: card.blocked,
            blockedReason: card.blockedReason,
            notes: card.notes,
            kanbanColumnId: card.kanbanColumnId
          });

        }
      });
    const offcanvas =
      new bootstrap.Offcanvas(
        document.getElementById(
          'editCardOffcanvas'
        )
      );

    offcanvas.show();
  }
  fecharCanvas() {
    const offcanvasElement =
      document.getElementById(
        'editCardOffcanvas'
      );

    if (!offcanvasElement) {
      return;
    }
    const offcanvas =
      bootstrap.Offcanvas.getInstance(
        offcanvasElement
      );

    offcanvas?.hide();
  }
  saveCard(): void {

    if (!this.selectedCard.id) {
      this.createCardsFromServiceOrder();

      return;
    }

    // this.cardService
    //   .update(payload)
    //   .subscribe({

    //     next: updated => {
    //       const column =
    //         this.columns.find(
    //           c =>
    //             c.id ===
    //             updated.kanbanColumnId
    //         );
    //       if (!column) {
    //         return;
    //       }

    //       const index =
    //         column.cards.findIndex(
    //           c =>
    //             c.id ===
    //             updated.id
    //         );

    //       if (index !== -1) {

    //         column.cards[index] =
    //           updated;
    //       }

    //       this.fecharCanvas();
    //       this.loadKanban();
    //       this.formCard.reset();
    //     }
    //   });
  }
  removeCard(id: number) {
    this.cardService.delete(id).subscribe({
      next: res => {
        this.loadKanban()
      }
    })
  }

  onProductChange(): void {
    let serviceOrder = this.serviceOrderSelected?.items
      .find(i => i.id == this.formCard.get('itemProductId')?.value);
    this.formCard.patchValue({
      estimatedMinutes: FormatProductionTime.formatHoursToDuration(serviceOrder!.estimatedMinutes),
      quantity: serviceOrder?.quantity
    });
  }

  formatHoursToDuration(value: number | null): string {
    return FormatProductionTime.formatHoursToDuration(value);
  }

  private calculateProgressByColumn(
    columnId: number
  ): number {

    const sortedColumns =
      [...this.columns]
        .sort(
          (a, b) =>
            a.columnOrder - b.columnOrder
        );

    const currentIndex =
      sortedColumns.findIndex(
        c => c.id === columnId
      );

    if (currentIndex <= 0) {
      return 0;
    }

    const lastIndex =
      sortedColumns.length - 1;

    if (currentIndex >= lastIndex) {
      return 100;
    }
    return Number(
      (
        (currentIndex / lastIndex) * 100
      ).toFixed(2)
    );
  }

  private createCardsFromServiceOrder(): void {

    if (!this.serviceOrderSelected) {
      return;
    }

    const firstColumnId =
      this.formCard.get('kanbanColumnId')?.value;

    const requests =
      this.serviceOrderSelected.items.map(
        (item, index): KanbanCardRequest => ({
          itemProductId: item.id,
          clienteId: this.serviceOrderSelected!.clienteId,
          serviceOrderId: this.serviceOrderSelected!.id,
          kanbanColumnId: firstColumnId,
          cardOrder: index,
          productionProgress: 0,
          estimatedMinutes: item.estimatedMinutes,
          blocked: false,
          blockedReason: '',
          notes: '',
          quantity: item.quantity,
          status: this.columns.find(column => firstColumnId == column.id)?.typeColumn || 'OPEN'
        })
      );
    console.log(requests)
    forkJoin(
      requests.map(
        request => this.cardService.create(request)
      )
    ).subscribe({

      next: cards => {

        this.toast.show(
          `${cards.length} cards criados com sucesso`,
          'success'
        );

        this.fecharCanvas();

        this.formCard.reset();

        this.loadKanban();
      },

      error: error => {

        this.toast.show(
          error.error.message,
          'danger'
        );
      }
    });
  }

}