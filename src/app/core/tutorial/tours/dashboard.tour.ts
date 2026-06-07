import { TutorialStep } from '../tutorial.types';

export const DASHBOARD_TOUR: TutorialStep[] = [

    {
        id: 'dashboard-header',

        title: 'Dashboard',

        text: 'Aqui você acompanha os indicadores do sistema.',

        attachTo: {
            element: '#dashboardHeader',
            on: 'bottom'
        }
    },

    {
        id: 'dashboard-cards',

        title: 'Indicadores',

        text: 'Aqui aparecem as métricas principais.',

        attachTo: {
            element: '#dashboard-cards',
            on: 'bottom'
        }
    },
    {
        id: 'quick-actions-grid',
        title: 'Ações Rápidas',
        text: 'Aqui estão as ações rápidas que você pode acessar!',
        attachTo: {
            element: '.quick-actions-grid',
            on: 'bottom-end'
        }
    },
    {
        id: 'dashsidebar',
        title: 'Dashboard',
        text: 'Aqui está a página do Dashboard!',
        attachTo: {
            element: '#dashsidebar',
            on: 'bottom-end'
        }
    },
    {
        id: 'catsidebar',
        title: 'Gestão de Categorias',
        text: 'Aqui é onde o seu sistema começa a funcionar, é toda a parte de cadastro de categorias dos itens de venda e insumos!',
        attachTo: {
            element: '#catsidebar',
            on: 'bottom-end'
        }
    },
    {
        id: 'clisidebar',
        title: 'Gestão de Clientes',
        text: 'Aqui é a sua carteira de clientes, toda parte de cadastro e gestão dos seus clientes estão nesta página!',
        attachTo: {
            element: '#clisidebar',
            on: 'bottom-end'
        }
    },
    {
        id: 'prdtssidebar',
        title: 'Gestão de Produtos',
        text: 'Em Produtos, é onde você cria seus produtos, precifica os produtos baseados nas regras de cálculos cadastradas e define quanto será o consumo dos seus itens de produção!',
        attachTo: {
            element: '#prdtssidebar',
            on: 'bottom-end'
        }
    },
    {
        id: 'calcsidebar',
        title: 'Cálculos e Regras de Preço',
        text: 'Está etapa é fundamental para você criar suas regras de preço dos seus produtos, é importante ter regras cadastradas antes de criar o seu produto!',
        attachTo: {
            element: '#calcsidebar',
            on: 'bottom-end'
        }
    },
    {
        id: 'prodsidebar',
        title: 'Produção',
        text: 'Aqui é onde você vai organizar suas produções, poderá criar e gerenciar cards e colunas de acordo com o seu negócio!',
        attachTo: {
            element: '#prodsidebar',
            on: 'right-end'
        }
    },
    {
        id: 'ossidebar',
        title: 'Ordem de Serviço',
        text: 'Aqui é onde você vai criar/solicitar ordens de serviço para seus clientes, é a porta de entrada para o ínicio de uma produção!',
        attachTo: {
            element: '#ossidebar',
            on: 'right-end'
        }
    },
    {
        id: 'invsidebar',
        title: 'Inventário/Estoque',
        text: 'Aqui é onde você vai organizar todos os seus itens de produção e gerenciamento do seu estoque!',
        attachTo: {
            element: '#invsidebar',
            on: 'right-end'
        }
    },
    {
        id: 'relsidebar',
        title: 'Relatórios',
        text: 'Aqui é onde você vai ter visibilidade dos seus ganhos!',
        attachTo: {
            element: '#relsidebar',
            on: 'right-end'
        }
    }
];