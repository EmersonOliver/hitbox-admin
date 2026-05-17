import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Input() collapsed = false;
  @Input() mobileOpen = false;

  @Output() toggleMobile = new EventEmitter<void>();

   menus = [
    { icon: 'bi-grid', label: 'Dashboard' },
    { icon: 'bi-box', label: 'Produtos' },
    { icon: 'bi-tags', label: 'Categorias' },
    { icon: 'bi-calculator', label: 'Cálculos' },
    { icon: 'bi-cash-stack', label: 'Custos' },
    { icon: 'bi-box-seam', label: 'Inventário' },
    { icon: 'bi-cpu', label: 'Máquinas' },
    { icon: 'bi-journal', label: 'Relatórios' }
  ];

  openServicos = false;

  toggleServicos() {
    this.openServicos = !this.openServicos;
  }

}
