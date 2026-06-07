import { TutorialStep } from '../tutorial.types';

export const INVENTORY_TOUR: TutorialStep[] = [

  {
    id: 'inventory-add',

    title: 'Adicionar Estoque',

    text: 'Cadastre uma entrada de estoque.',

    attachTo: {
      element: '#btnInventory',
      on: 'bottom'
    }
  }

];