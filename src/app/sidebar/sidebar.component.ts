import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VerifyDomainService } from '../core/verify/verify-domain.service';
import { VerifyDomainsResponse } from '../core/models/verify-domain.response';
import { PermissionService } from '../core/permissions/permission.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  @Input() collapsed = false;
  @Input() mobileOpen = false;

  @Output() toggleMobile = new EventEmitter<void>();

  verifyResponse?: VerifyDomainsResponse;

  menus = [
    { id: 'dashsidebar', name: 'Dashboard', link: '/dashboard', icon: 'bi bi-grid', visible: true }
  ];


  constructor(private readonly verifyDomainService: VerifyDomainService, public permission: PermissionService) { }


  ngOnInit(): void {
    this.loadMenus();

  }

  loadMenus() {
    this.menus = [
      { id: 'dashsidebar', name: 'Dashboard', link: '/dashboard', icon: 'bi bi-grid', visible: !this.permission.hasRole('SELLER')   },
      { id: 'sellserbar', name: !this.permission.hasRole('SELLER') ? 'Vendas' : 'Dashboard', link: '/seller', icon: !this.permission.hasRole('SELLER') ? 'bi bi-cart-check' : 'bi bi-grid', visible: this.permission.has('CUSTOMER_VIEW') },
      { id: 'catsidebar', name: 'Categorias', link: '/categorias', icon: 'bi bi-tags', visible: this.permission.has('CATEGORY_VIEW') },
      { id: 'clisidebar', name: 'Clientes', link: '/clientes', icon: 'bi bi-people', visible: this.permission.has('CUSTOMER_VIEW') },
      { id: 'fornesidebar', name: 'Fornecedores', link: '/fornecedores', icon: 'bi bi-building-gear', visible: this.permission.has('SUPPLIERS_VIEW') },
      { id: 'prdtssidebar', name: 'Produtos', link: '/produtos', icon: 'bi bi-box', visible: this.permission.has('PRODUCT_VIEW') },
      { id: 'calcsidebar', name: 'Cálculos', link: '/calculos', icon: 'bi bi-calculator', visible: this.permission.has('CALCULATION_VIEW') },
      { id: 'prodsidebar', name: 'Produção', link: '/kanban', icon: 'bi bi-lightbulb', visible: this.permission.has('PRODUCTION_VIEW') },
      { id: 'ossidebar', name: 'Ordens de Serviço', link: '/orderService', icon: 'bi bi-journal-check', visible: this.permission.has('SERVICE_ORDER_VIEW') },
      { id: 'invsidebar', name: 'Inventário/Estoque', link: '/inventario', icon: 'bi bi-box-seam', visible: this.permission.has('INVENTORY_VIEW') },
      { id: 'relsidebar', name: 'Relatórios', link: '/relatorios', icon: 'bi bi-journal', visible: this.permission.has('REPORT_VIEW') },

    ];
  }




  openServicos = false;

  toggleServicos() {
    this.openServicos = !this.openServicos;
  }

}
