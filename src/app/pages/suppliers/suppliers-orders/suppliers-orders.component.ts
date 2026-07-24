import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-suppliers-orders',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './suppliers-orders.component.html',
  styleUrl: './suppliers-orders.component.scss'
})
export class SuppliersOrdersComponent {
  constructor(public title: Title) {
    this.title.setTitle('ERSO ERP - Pedidos ao Fornecedor')
  }
}
