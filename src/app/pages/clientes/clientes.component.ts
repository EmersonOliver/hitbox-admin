import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from '../../core/cliente/cliente.service';
import { ClienteResponse } from './models/cliente.response';
import { ToastComponent } from "../components/toast/toast.component";
import { ToastService } from '../components/toast/toast.service';
import { ClienteModalComponent } from "./components/cliente-modal/cliente-modal.component";
import { EnderecosClienteModalViewComponent } from "./components/enderecos-cliente-modal-view/enderecos-cliente-modal-view.component";
declare var bootstrap: any;
@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, ToastComponent, ClienteModalComponent, EnderecosClienteModalViewComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent {
  customers: any[] = [];
  clientes: ClienteResponse[] = [];

  clienteSelecionado?: ClienteResponse;

  search = '';

  filterType = '';

  currentPage = 1;

  totalPages = 1;

  totalElements = 0;

  pageSize = 10;

  pages: number[] = [];

  sortField = 'nome';

  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private readonly clienteService: ClienteService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {

    this.clienteService.page(
      this.currentPage - 1,
      this.pageSize,
      this.search,
      this.sortField,
      this.sortDirection
    ).subscribe(response => {

      this.clientes = response.content;

      this.totalPages = response.totalPages;

      this.totalElements = response.totalElements;

      this.pages = Array.from(
        { length: this.totalPages },
        (_, index) => index + 1
      );
    });
  }

  reloadClientes(): void {
    this.loadClientes();
  }

  openClienteModal(): void {

    this.clienteSelecionado = undefined;

    const modal =
      new bootstrap.Modal(
        document.getElementById('clienteModal')
      );

    modal.show();
  }

  editarCliente(cliente: ClienteResponse): void {

    this.clienteSelecionado = cliente;

    const modal =
      new bootstrap.Modal(
        document.getElementById('clienteModal')
      );

    modal.show();
  }

  visualizarEnderecos(cliente: ClienteResponse): void {
    this.clienteSelecionado = cliente;
    const modal =
      new bootstrap.Modal(
        document.getElementById('enderecosClienteModalView')
      );

    modal.show();
  }

  abrirModalRemocao(cliente: ClienteResponse): void {

    this.clienteSelecionado = cliente;

    const modal =
      new bootstrap.Modal(
        document.getElementById('clienteModalExclusao')
      );

    modal.show();
  }

  removerCliente(id?: string): void {

    if (!id) {
      return;
    }

    this.clienteService
      .delete(id)
      .subscribe(() => {
        this.loadClientes();
      });
  }

  changePage(page: number): void {

    if (
      page < 1 ||
      page > this.totalPages
    ) {
      return;
    }

    this.currentPage = page;

    this.loadClientes();
  }

  sort(field: string): void {

    if (this.sortField === field) {

      this.sortDirection =
        this.sortDirection === 'asc'
          ? 'desc'
          : 'asc';

    } else {

      this.sortField = field;

      this.sortDirection = 'asc';
    }

    this.loadClientes();
  }

  getInitials(nome: string): string {

    if (!nome) {
      return '?';
    }

    return nome
      .split(' ')
      .map(x => x[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

}
