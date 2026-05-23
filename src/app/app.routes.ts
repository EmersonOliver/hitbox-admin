import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
    { path: 'produtos', loadComponent: () => import('./pages/produtos/produtos.component').then(m => m.ProdutosComponent) },
    { path: 'categorias', loadComponent: () => import('./pages/categorias/categorias.component').then(m => m.CategoriasComponent) },
    { path: 'calculos', loadComponent: () => import('./pages/calc-pricing/calc-pricing.component').then(m => m.CalcPricingComponent) },
    { path: 'catalogo', loadComponent: () => import('./pages/pricing-catalog/pricing-catalog.component').then(m => m.PricingCatalogComponent) },
    { path: 'estoque', loadComponent: () => import('./pages/stock/stock.component').then(m => m.StockComponent) },
    { path: 'inventario', loadComponent: () => import('./pages/inventory/inventory.component').then(m => m.InventoryComponent) },
    { path: 'relatorios', loadComponent: () => import('./pages/reports/reports.component').then(m => m.ReportsComponent) },
    { path: 'producao', loadComponent: () => import('./pages/producao/producao.component').then(m => m.ProducaoComponent) }



];
