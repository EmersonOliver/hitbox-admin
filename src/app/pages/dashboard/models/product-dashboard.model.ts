import { ProductResponse } from '../../produtos/components/produto-modal/models/produto.model';
import { MonthlyProduction } from './monthly-production.model';
import { MonthlyRevenue } from './monthly-revenue.model';

export interface ProductDashboardResponse {

  /**
   * Produto
   */
  product: ProductResponse;

  /**
   * Produção
   */
  producedQuantity: number;

  soldQuantity: number;

  deliveredQuantity: number;

  serviceOrdersCount: number;

  /**
   * Financeiro
   */
  totalRevenue: number;

  totalProductionCost: number;

  totalProfit: number;

  averageMargin: number;

  averageTicket: number;

  profitPerHour: number;

  /**
   * Popularidade
   */
  ranking: number;

  popularityScore: number;

  /**
   * Histórico
   */
  productionHistory: MonthlyProduction[];

  revenueHistory: MonthlyRevenue[];
}