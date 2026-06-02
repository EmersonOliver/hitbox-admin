import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input,  OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VerifyDomainService } from '../core/verify/verify-domain.service';
import { VerifyDomainsResponse } from '../core/models/verify-domain.response';

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
    { name: 'Dashboard', link: '/dashboard', icon: 'bi bi-grid', visible: true },
    { name: 'Categorias', link: '/categorias', icon: 'bi bi-tags', visible: true },
    { name: 'Clientes', link: '/clientes', icon: 'bi bi-people', visible: true },
    { name: 'Produtos', link: '/produtos', icon: 'bi bi-box', visible: true },
    { name: 'Cálculos', link: '/calculos', icon: 'bi bi-calculator', visible: true },
    { name: 'Produção', link: '/kanban', icon: 'bi bi-lightbulb', visible: true },
    { name: 'Ordens de Serviço', link: '/orderService', icon: 'bi bi-journal-check', visible: true },
    { name: 'Inventário/Estoque', link: '/inventario', icon: 'bi bi-box-seam', visible: true },
    { name: 'Relatórios', link: '/relatorios', icon: 'bi bi-journal', visible: true },
  ];


  constructor(private readonly verifyDomainService: VerifyDomainService) { }
 

  ngOnInit(): void {
    this.verifyDomainService.verifyCRUDDomains().subscribe({
      next: response => {
        this.verifyResponse = response;
        this.loadMenus();
      }
    })
  }

  loadMenus() {
    this.menus = [
      { name: 'Dashboard', link: '/dashboard', icon: 'bi bi-grid', visible: true },
      { name: 'Categorias', link: '/categorias', icon: 'bi bi-tags', visible: true },
      { name: 'Clientes', link: '/clientes', icon: 'bi bi-people', visible: true },
      { name: 'Produtos', link: '/produtos', icon: 'bi bi-box', visible: true },
      { name: 'Cálculos', link: '/calculos', icon: 'bi bi-calculator', visible: true },
      { name: 'Produção', link: '/kanban', icon: 'bi bi-lightbulb', visible: true },
      { name: 'Ordens de Serviço', link: '/orderService', icon: 'bi bi-journal-check', visible: true },
      { name: 'Inventário/Estoque', link: '/inventario', icon: 'bi bi-box-seam', visible: true },
      { name: 'Relatórios', link: '/relatorios', icon: 'bi bi-journal', visible: true },
    ];
  }




  openServicos = false;

  toggleServicos() {
    this.openServicos = !this.openServicos;
  }

}
