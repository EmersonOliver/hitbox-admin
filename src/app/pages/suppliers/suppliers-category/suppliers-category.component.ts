import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SuppliersCategoryService } from '../../../core/suppliers/suppliers-category.service';

@Component({
  selector: 'app-suppliers-category',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './suppliers-category.component.html',
  styleUrl: './suppliers-category.component.scss'
})

export class SuppliersCategoryComponent {

  constructor(public title: Title, private supplierCategoryService:SuppliersCategoryService) {
    this.title.setTitle('ERSO ERP - Categorias Fornecedores')
  }

save(){
  this.supplierCategoryService.saveSupplierCategory({code:'ADB', name:'Destilaria', description:'Destilarias gerais', active:true}).subscribe(
    {
      next: response=> {
        window.alert('Salvo com sucesso!')
      }
    }
  );
}


}
