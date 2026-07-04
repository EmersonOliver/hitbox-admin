import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { PrivateLayoutComponent } from './layouts/private-layout/private-layout.component';
import { SettingsComponent } from './pages/profile/settings/settings.component';
import { authGuard } from './core/auth/guards/auth.guard';
import { guestGuard } from './core/auth/guards/guest.guard';

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
                        .then(m => m.LoginComponent),
                canActivate: [guestGuard]
            },
            {
                path: 'register',
                loadComponent: () =>
                    import('./pages/register/register.component').then(
                        m => m.RegisterComponent
                    ),
                canActivate: [guestGuard]
            },
            {
                path: 'create-company',
                loadComponent: () =>
                    import('./pages/company/create-company/create-company.component').then(
                        m => m.CreateCompanyComponent
                    ),
            },
            {
                path: 'select-company',
                loadComponent: () =>
                    import('./pages/company/company-selector/company-selector.component').then(
                        m => m.CompanySelectorComponent
                    ),
            },
            {
                path: 'workspace-setup',
                loadComponent: () =>
                    import('./pages/workspace-setup/workspace-setup.component').then(
                        m => m.WorkspaceSetupComponent
                    )
            },
            {
                path: 'invite/:token',
                loadComponent: () =>
                    import('./pages/profile/team/onboarding-user/onboarding-user.component').then(
                        m => m.OnboardingUserComponent
                    )
            }
        ]
    },
    {
        path: '',
        component: PrivateLayoutComponent,
        canActivate: [authGuard],
        children: [

            { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
            { path: 'produtos', loadComponent: () => import('./pages/produtos/produtos.component').then(m => m.ProdutosComponent) },
            { path: 'produtos/:id', loadComponent: () => import('./pages/produtos/produtos.component').then(m => m.ProdutosComponent) },
            { path: 'clientes', loadComponent: () => import('./pages/clientes/clientes.component').then(m => m.ClientesComponent) },
            { path: 'categorias', loadComponent: () => import('./pages/categorias/categorias.component').then(m => m.CategoriasComponent) },
            {
                path: 'calculos',
                loadComponent: () => import('./pages/calc-pricing/calc-page/calc-page.component').then(m => m.CalcPageComponent)
                ,
                children: [
                    {
                        path: '',
                        redirectTo: '',
                        pathMatch: 'full'
                    },
                    {
                        path: '',
                        loadComponent: () =>
                            import('./pages/calc-pricing/dashboard-calc/dashboard-calc.component').then(m => m.DashboardCalcComponent)
                    },
                    {
                        path: 'pricing/new',
                        loadComponent: () =>
                            import('./pages/calc-pricing/calc-pricing.component').then(m => m.CalcPricingComponent)
                    }
                ]
            },
            { path: 'catalogo', loadComponent: () => import('./pages/pricing-catalog/pricing-catalog.component').then(m => m.PricingCatalogComponent) },
            { path: 'inventario', loadComponent: () => import('./pages/inventory/inventory.component').then(m => m.InventoryComponent) },
            { path: 'inventario/:id', loadComponent: () => import('./pages/inventory/inventory.component').then(m => m.InventoryComponent) },
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
            },
            {
                path: 'profile/teams', loadComponent: () =>
                    import('./pages/profile/team/team.component')
                        .then(m => m.TeamComponent)
            },
            {
                path: 'profile/teams/users', loadComponent: () =>
                    import('./pages/profile/team/users/users.component')
                        .then(m => m.UsersComponent)
            },
            {
                path: 'profile/teams/permissions', loadComponent: () =>
                    import('./pages/profile/team/permissions/permissions.component')
                        .then(m => m.PermissionsComponent)
            },
            {
                path: 'profile/teams/permissions/:teamId', loadComponent: () =>
                    import('./pages/profile/team/permissions/permissions.component')
                        .then(m => m.PermissionsComponent)
            },

            {
                path: 'profile/settings',
                component: SettingsComponent,
                children: [

                    {
                        path: '',
                        redirectTo: 'appearance',
                        pathMatch: 'full'
                    },

                    {
                        path: 'appearance',
                        loadComponent: () =>
                            import('./pages/profile/settings/setting-appearance/setting-appearance.component')
                                .then(m => m.SettingAppearanceComponent)
                    },

                    {
                        path: 'notifications',
                        loadComponent: () =>
                            import('./pages/profile/settings/setting-notification/setting-notification.component')
                                .then(m => m.SettingNotificationComponent)
                    },

                    {
                        path: 'company',
                        loadComponent: () =>
                            import('./pages/profile/settings/setting-company/setting-company.component')
                                .then(m => m.SettingCompanyComponent)
                    },

                    {
                        path: 'integrations',
                        loadComponent: () =>
                            import('./pages/profile/settings/setting-integrations/setting-integrations.component')
                                .then(m => m.SettingIntegrationsComponent)
                    },

                    {
                        path: 'backup',
                        loadComponent: () =>
                            import('./pages/profile/settings/setting-backup/setting-backup.component')
                                .then(m => m.SettingBackupComponent)
                    }
                ]
            }

        ]
    },






];
