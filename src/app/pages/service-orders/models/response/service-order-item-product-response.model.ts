export interface ServiceOrderItemProductResponse {

  id: number;

  productId: number;

  productName: string;

  productImage?: string;

  quantity: number;

  costUnit: number;

  totalItemCost: number;

  salePriceUnit: number;

  totalSalePrice: number;

  estimatedMinutes: number;

}