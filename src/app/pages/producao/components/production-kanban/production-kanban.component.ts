import {
  Component
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
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;
@Component({
  selector: 'app-production-kanban',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule
  ],
  templateUrl: './production-kanban.component.html',
  styleUrls: ['./production-kanban.component.scss']
})
export class ProductionKanbanComponent {
  columnName = '';
  columns = [
    {
      id: 'pendente',
      name: 'Fila',
      color: '#6b7280',
      cards: [
        {
          id: 1,
          product: 'Batman Bust',
          sku: 'BAT-001',
          printer: 'K1 Max',
          time: '5h',
          quantity: 2,
          progress: 0,
          priority: 'ALTA',
          operator: 'Emerson'
        },
        {
          id: 2,
          product: 'Iron Man Helmet',
          sku: 'MARVEL-88',
          printer: 'Bambu Lab',
          time: '12h',
          quantity: 1,
          progress: 0,
          priority: 'MEDIA',
          operator: 'Lucas'
        }
      ]
    },
    {
      id: 'configuracao',
      name: 'Configuração',
      color: '#06b6d4',
      cards: [
        {
          id: 3,
          product: 'Deadpool Figure',
          sku: 'DP-777',
          printer: 'Kobra 2',
          time: '3h',
          quantity: 4,
          progress: 15,
          priority: 'MEDIA',
          operator: 'Fernanda'
        }
      ]
    },
    {
      id: 'producao',
      name: 'Produzindo',
      color: '#f59e0b',
      cards: [
        {
          id: 4,
          product: 'Darth Vader',
          sku: 'STAR-01',
          printer: 'K1C',
          time: '8h',
          quantity: 1,
          progress: 72,
          priority: 'ALTA',
          operator: 'Marcos'
        }
      ]
    },
    {
      id: 'finalizado',
      name: 'Finalizado',
      color: '#22c55e',
      cards: [
        {
          id: 5,
          product: 'Thor Hammer',
          sku: 'MJOLNIR',
          printer: 'Bambu X1',
          time: '6h',
          quantity: 1,
          progress: 100,
          priority: 'BAIXA',
          operator: 'Amanda'
        }
      ]
    }
  ];

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

  drop(event: CdkDragDrop<any[]>): void {

    if (
      event.previousContainer === event.container
    ) {

      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log('opa')
      console.log(event)
      return;
    }

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
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
    const name =
      this.columnName
    if (!this.columnName) {
      return;
    }

    this.columns.push({
      id: crypto.randomUUID(),
      name,
      color: this.selectedColumnColor,
      cards: []
    });

    this.selectedColumnColor = '#8b5cf6';
    this.columnName = ''

  }

  removeColumn(columnId: string): void {

    this.columns =
      this.columns.filter(
        col => col.id !== columnId
      );
  }

  editColumn(column: any): void {

    const newName =
      prompt(
        'Novo nome',
        column.name
      );

    if (!newName) {
      return;
    }

    column.name = newName;
  }

  addCard(): void {

    this.columns[0].cards.push({
      id: Date.now(),
      product: 'Novo Produto',
      sku: 'SKU-NEW',
      printer: 'K1 Max',
      time: '0h',
      quantity: 1,
      progress: 0,
      priority: 'MEDIA',
      operator: 'Operador'
    });
  }

  openCard(card: any): void {

    console.log(card);
  }
}