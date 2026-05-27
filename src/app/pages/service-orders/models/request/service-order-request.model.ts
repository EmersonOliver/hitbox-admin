import { ServiceOrderItemProductRequest } from './service-order-item-product-request.model';

export interface ServiceOrderRequest {

  id?: number;

  clienteId: string;

  status?: string;

  totalSalePrice?: number;

  totalProfit?: number;

  expectedDate?: Date;

  finishedAt?: Date;

  observations?: string;

  totalEstimatedMinutes?: number;

  items: ServiceOrderItemProductRequest[];

}