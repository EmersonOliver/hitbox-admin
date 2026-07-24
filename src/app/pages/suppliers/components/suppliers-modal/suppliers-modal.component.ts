import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupplierResponse } from '../../models/response/supplier.response';
import { SuppliersCategoryService } from '../../../../core/suppliers/suppliers-category.service';
import { SupplierCategoryResponse } from '../../models/response/supplier.category.response';

@Component({
  selector: 'app-suppliers-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './suppliers-modal.component.html',
  styleUrl: './suppliers-modal.component.scss'
})
export class SuppliersModalComponent implements OnInit {

  @Input()
  supplierSelecionado?: SupplierResponse | null;

  @Output()
  save = new EventEmitter<SupplierResponse>();

  editing: boolean = false;
  form: FormGroup;
  suppliersCategory?: SupplierCategoryResponse[] | null;

  constructor(private fb: FormBuilder, private supplierCategoryService: SuppliersCategoryService) {
    this.form = this.fb.group({
      name: [null, Validators.required],
      document: [null, Validators.required],
      phone: [null, Validators.required],
      email:[null],
      active: [false],
      supplierCategoryId: [null, Validators.required],
      addressRequests: this.fb.array([])
    });
  }
  ngOnInit(): void {
    this.loadCategorySuppliers();
  }
  get addressRequests(): FormArray {
    return this.form.get(
      'addressRequests'
    ) as FormArray;
  }

  adicionarEndereco(): void {
    this.addressRequests.push(
      this.criarEndereco()
    );
  }
  loadCategorySuppliers() {
    this.supplierCategoryService.listAllCategoriesParameters().subscribe({
      next: response => {
        this.suppliersCategory = response;
      }
    })
  }
  criarEndereco(): FormGroup {

    return this.fb.group({

      tipo: ['RESIDENCIAL'],

      endereco: [''],

      cep: [''],

      numero: [null],

      bairro: [''],

      cidade: [''],

      complemento: [''],

      observacoes: ['']
    });
  }
  removerEndereco(index: number): void {
    this.addressRequests.removeAt(index);
  }
  salvarSuppliers() {
    this.save.emit(this.form.getRawValue())
  }
}
