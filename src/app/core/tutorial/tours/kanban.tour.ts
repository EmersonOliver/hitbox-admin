import { TutorialStep } from '../tutorial.types';

export const KANBAN_TOUR: TutorialStep[] = [

  {
    id: 'new-production',

    title: 'Nova Produção',

    text: 'Clique aqui para criar uma nova produção.',

    attachTo: {
      element: '#btnNovaProducao',
      on: 'bottom'
    }
  },

  {
    id: 'kanban-columns',

    title: 'Colunas',

    text: 'Arraste os cards entre as colunas.',

    attachTo: {
      element: '.kanban-board',
      on: 'top'
    }
  },

  {
    id: 'kanban-card',

    title: 'Cards',

    text: 'Cada card representa um item da ordem de serviço.',

    attachTo: {
      element: '.kanban-card',
      on: 'right'
    }
  }

];