import { ServiceOrderItemProductResponse } from './service-order-item-product-response.model';

export interface ServiceOrderResponse {

  id: number;

  clienteId: string;

  clienteNome: string;

  clientePhone?: string;

  clienteDocument?: string;

  status: string;

  totalSalePrice: number;

  totalProfit: number;

  createdAt: Date;

  expectedDate?: Date;

  finishedAt?: Date;

  observations?: string;

  totalEstimatedMinutes: number;

  totalItems: number;

  items: ServiceOrderItemProductResponse[];

}