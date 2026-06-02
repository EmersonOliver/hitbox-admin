import { TutorialStep } from '../tutorial.types';

export const PRODUCTS_TOUR: TutorialStep[] = [

  {
    id: 'product-create',

    title: 'Novo Produto',

    text: 'Cadastre um novo produto.',

    attachTo: {
      element: '#btnNewProduct',
      on: 'bottom'
    }
  },

  {
    id: 'product-grid',

    title: 'Produtos',

    text: 'Lista de produtos cadastrados.',

    attachTo: {
      element: '#productGrid',
      on: 'top'
    }
  }

];