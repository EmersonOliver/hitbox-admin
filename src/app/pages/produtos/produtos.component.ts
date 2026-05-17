import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { InventoryModalComponent } from "../components/inventory-modal/inventory-modal.component";
import { ProdutoModalComponent } from "../components/produto-modal/produto-modal.component";

declare var $: any;
@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, InventoryModalComponent, ProdutoModalComponent],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent {

  constructor(private title: Title) {
    title.setTitle('Hitbox - Produtos')
  }


}
