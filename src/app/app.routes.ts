import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { PrivateLayoutComponent } from './layouts/private-layout/private-layout.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'login',
                loadComponent: () =>
                    import('./pages/login/login.component')
                        .then(m => m.LoginComponent)
            }
        ]
    },
    {
        path: '',
        component: PrivateLayoutComponent,
        children: [
            { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
            { path: 'produtos', loadComponent: () => import('./pages/produtos/produtos.component').then(m => m.ProdutosComponent) },
            { path: 'clientes', loadComponent: () => import('./pages/clientes/clientes.component').then(m => m.ClientesComponent) },
            { path: 'categorias', loadComponent: () => import('./pages/categorias/categorias.component').then(m => m.CategoriasComponent) },
            { path: 'calculos', loadComponent: () => import('./pages/calc-pricing/calc-pricing.component').then(m => m.CalcPricingComponent) },
            { path: 'catalogo', loadComponent: () => import('./pages/pricing-catalog/pricing-catalog.component').then(m => m.PricingCatalogComponent) },
            { path: 'inventario', loadComponent: () => import('./pages/inventory/inventory.component').then(m => m.InventoryComponent) },
            { path: 'relatorios', loadComponent: () => import('./pages/reports/reports.component').then(m => m.ReportsComponent) },
            { path: 'producao', loadComponent: () => import('./pages/producao/producao.component').then(m => m.ProducaoComponent) },
            {
                path: 'kanban', loadComponent: () => import('./pages/producao/components/production-kanban/production-kanban.component')
                    .then(m => m.ProductionKanbanComponent)
            },
            {
                path: 'orderService', loadComponent: () =>
                    import('./pages/service-orders/service-order/service-order.component')
                        .then(m => m.ServiceOrderComponent)
            },
            {
                path: 'profile', loadComponent: () =>
                    import('./pages/profile/profile.component')
                        .then(m => m.ProfileComponent)
            },
              {
                path: 'profile/change-password', loadComponent: () =>
                    import('./pages/profile/change-password/change-password.component')
                        .then(m => m.ChangePasswordComponent)
            }

        ]
    },






];
