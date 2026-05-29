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
    this.loadKanban();
    this.carregarCliente();
    this.carregarOrdemServicoByStatus();
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

  carregarOrdemServicoByStatus() {
    this.orderService.findByStatus('OPEN').subscribe({
      next: res => {
        this.ordersComboOpen = res
        console.log(res)
      }
    })
  }

  changeOrder() {
    this.serviceOrderSelected = this.ordersComboOpen.find(r => r.id == this.formCard.get('serviceOrderId')?.value);
    let productItem = this.serviceOrderSelected?.items.find(i => i.id === this.formCard.get('itemProductId')?.value);
    this.formCard.patchValue({
      clienteId: this.serviceOrderSelected?.clienteId,
    });

    if (productItem) {
      this.formCard.patchValue({
        estimatedMinutes:
          this.formatHoursToDuration(
            productItem!.estimatedMinutes
          )
      });
      console.log(this.formatHoursToDuration(
        productItem!.estimatedMinutes
      ))
    }
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

    // =====================================================
    // MESMA COLUNA
    // =====================================================

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

    // =====================================================
    // COLUNA ORIGEM
    // =====================================================

    const previousColumn =
      this.columns.find(
        column =>
          column.id ===
          Number(event.previousContainer.id)
      );

    if (!previousColumn) {
      return;
    }

    // =====================================================
    // MOVE CARD
    // =====================================================

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

    // =====================================================
    // UPDATE CARD
    // =====================================================

    movedCard.kanbanColumnId =
      targetColumn.id;

    movedCard.cardOrder =
      event.currentIndex;

    this.cardService.update({

      id: movedCard.id,

      itemProductId:
        movedCard.itemProductId,

      serviceOrderId:
        movedCard.serviceOrderId,

      kanbanColumnId:
        targetColumn.id,

      cardOrder:
        movedCard.cardOrder,

      productionProgress:
        movedCard.productionProgress,

      estimatedMinutes:
        movedCard.estimatedMinutes,

      blocked:
        movedCard.blocked,

      blockedReason:
        movedCard.blockedReason,

      notes:
        movedCard.notes,
      clienteId:
        movedCard.clienteId,
      quantity:
        movedCard.quantity

    }).subscribe();

    // =====================================================
    // SAVE MOVEMENT
    // =====================================================

    this.movementService.create({

      id: 0,

      cardId:
        movedCard.id,

      fromColumnId:
        previousColumn.id,

      toColumnId:
        targetColumn.id

    }).subscribe();

    // =====================================================
    // UPDATE ORDERS
    // =====================================================

    this.updateCardOrders(
      previousColumn
    );

    this.updateCardOrders(
      targetColumn
    );
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
      columnOrder: this.columns.length

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
      columnOrder: column.columnOrder

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
      clienteId: 0,
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
      quantity: 1
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

        this.cardService.update({

          id: card.id,
          itemProductId: card.itemProductId,
          serviceOrderId: card.serviceOrderId,
          kanbanColumnId: card.kanbanColumnId,
          cardOrder: index,
          productionProgress:
            card.productionProgress,
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
            card.quantity

        }).subscribe();
      }
    );
  }

  editCard(card: KanbanCardResponse): void {

    this.selectedCard = {
      ...card
    };

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

    const payload = {
      itemProductId:
        this.formCard.get('itemProductId')?.value,
      clienteId:
        this.formCard.get('clienteId')?.value,
      serviceOrderId:
        this.formCard.get('serviceOrderId')?.value,
      kanbanColumnId:
        this.formCard.get('kanbanColumnId')?.value,
      cardOrder:
        this.formCard.get('cardOrder')?.value,
      productionProgress:
        this.formCard.get('productionProgress')?.value,
      estimatedMinutes:
        this.parseDurationToHours(this.formCard.get('estimatedMinutes')?.value),
      blocked:
        this.formCard.get('blocked')?.value,
      blockedReason:
        this.formCard.get('blockedReason')?.value,
      notes:
        this.formCard.get('notes')?.value,
      quantity:
        this.formCard.get('quantity')?.value
    };

    // =========================================
    // CREATE
    // =========================================
    console.log('iNiciando save')
    if (!this.selectedCard.id) {
      console.log('Entrou no save')
      this.cardService
        .create(payload)
        .subscribe({

          next: created => {

            const column =
              this.columns.find(
                c =>
                  c.id ===
                  created.kanbanColumnId
              );

            if (!column) {
              return;
            }
            column.cards.push(created);
            this.fecharCanvas();
            this.loadKanban();
            this.formCard.reset();

          }
        });
      return;
    }



    // =========================================
    // UPDATE
    // =========================================

    this.cardService
      .update(payload)
      .subscribe({

        next: updated => {

          const column =
            this.columns.find(
              c =>
                c.id ===
                updated.kanbanColumnId
            );

          if (!column) {
            return;
          }

          const index =
            column.cards.findIndex(
              c =>
                c.id ===
                updated.id
            );

          if (index !== -1) {

            column.cards[index] =
              updated;
          }
        }
      });
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
      estimatedMinutes: this.formatHoursToDuration(serviceOrder!.estimatedMinutes),
      quantity: serviceOrder?.quantity
    });
  }


  private parseDurationToHours(value: string | null): number {
    if (!value) {
      return 0;
    }

    const normalized =
      value.toLowerCase().trim();

    const days =
      this.extract(normalized, /(\d+)d/);

    const hours =
      this.extract(normalized, /(\d+)h/);

    const minutes =
      this.extract(normalized, /(\d+)m/);

    const seconds =
      this.extract(normalized, /(\d+)s/);

    return (
      (days * 24)
      + hours
      + (minutes / 60)
      + (seconds / 3600)
    );
  }

  private extract(
    value: string,
    regex: RegExp
  ): number {

    const match =
      value.match(regex);

    return match
      ? Number(match[1])
      : 0;
  }
  formatHoursToDuration(
    value: number | null
  ): string {

    if (!value || value <= 0) {
      return '';
    }

    let totalSeconds =
      Math.round(value * 3600);

    const days =
      Math.floor(totalSeconds / 86400);

    totalSeconds %= 86400;

    const hours =
      Math.floor(totalSeconds / 3600);

    totalSeconds %= 3600;

    const minutes =
      Math.floor(totalSeconds / 60);

    const seconds =
      totalSeconds % 60;

    const parts: string[] = [];

    if (days > 0) {
      parts.push(`${days}d`);
    }

    if (hours > 0) {
      parts.push(`${hours}h`);
    }

    if (minutes > 0) {
      parts.push(`${minutes}m`);
    }

    if (seconds > 0) {
      parts.push(`${seconds}s`);
    }

    return parts.join('');
  }

}