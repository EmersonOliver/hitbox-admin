export interface ServiceOrderItemProductRequest {

  id?: number;

  productId: number;

  quantity: number;

  costUnit?: number;

  totalItemCost?: number;

  salePriceUnit: number;

  totalSalePrice?: number;

  estimatedMinutes?: number;

}