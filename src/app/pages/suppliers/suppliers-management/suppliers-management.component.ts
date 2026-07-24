import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from "../../components/toast/toast.component";
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SuppliersService } from '../../../core/suppliers/suppliers.service';
import { SuppliersModalComponent } from '../components/suppliers-modal/suppliers-modal.component';
import { SupplierResponse } from '../models/response/supplier.response';
import { SuppliersCategoryService } from '../../../core/suppliers/suppliers-category.service';
import { SupplierCategoryResponse } from '../models/response/supplier.category.response';
declare var bootstrap: any;
@Component({
  selector: 'app-suppliers-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ToastComponent, RouterModule, SuppliersModalComponent],
  templateUrl: './suppliers-management.component.html',
  styleUrl: './suppliers-management.component.scss'
})
export class SuppliersManagementComponent implements OnInit {
  search = '';

  filterType = '';

  currentPage = 1;

  totalPages = 1;

  totalElements = 0;

  pageSize = 10;

  pages: number[] = [];

  sortField = 'nome';

  sortDirection: 'asc' | 'desc' = 'asc';

  statusFilter: any;

  suppliers: any[] = [];
  supplierSelecionado?: SupplierResponse | null;


  constructor(public title: Title, private supplierService: SuppliersService) {
    this.title.setTitle('ERSO ERP - Gestão Fornecedores')
  }
  ngOnInit(): void {
    this.supplierService.page(0, 10).subscribe({
      next: response => {
        this.suppliers = response.content
      }
    })
  }


  saveSuppliers(event: any) {
    this.supplierService.createSupplier(event).subscribe({
      next: response => {
        console.log('OK')
        window.alert('Criado com sucesso!')
      }
    })

  }


  changePage(page: number) {
  }
  openDeleteModal(supplier: { id: number; name: string; email: string; document: string; phone: string; category: string; city: string; lastPurchase: string; active: boolean; }) {
  }
  viewSupplier(supplier: { id: number; name: string; email: string; document: string; phone: string; category: string; city: string; lastPurchase: string; active: boolean; }) {
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
  loadSuppliers() {
  }
  openSupplierModal() {
    const modal =
      new bootstrap.Modal(
        document.getElementById(
          'supplierModal'
        )
      );
    modal.show();
  }
  deleteSupplier(supplier: any) {
  }
  editSupplier(supplier: any) {
  }


}
