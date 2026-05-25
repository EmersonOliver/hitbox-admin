import {
  Component
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

@Component({
  selector: 'app-producao-modal',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './producao-modal.component.html',

  styleUrl:
    './producao-modal.component.scss'
})
export class ProducaoModalComponent {

  currentStep = 1;

  items = [
    {
      id: 1,
      nome:'Miniatura Zelda'

    },
    {
      id: 2,
      nome:'Caneca Monster'

    },
    {
      id: 3,
      nome:'Coxinha Miniatura'

    },
    {
      id: 4,
      nome:'Sabonete Troll amigo'

    }
  ]

  selectedMaterials = [
    {
      id: 1,
      name: 'PLA Preto',
      category: 'Filamento',
      stock: '2 KG',
      imageUrl: 'assets/no-image.png'
    }
  ];

  nextStep(): void {

    if (this.currentStep >= 3) {
      return;
    }

    this.currentStep++;
  }

  previousStep(): void {

    if (this.currentStep <= 1) {
      return;
    }

    this.currentStep--;
  }
}