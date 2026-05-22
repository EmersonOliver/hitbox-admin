export interface ProductResponse {

  id: number;

  name: string;

  sku: string;

  category: string;

  imageUrl: string;

  salePrice: number;

  costPrice: number;

  profitMargin: number;

  stock: number;

  productionTime: number;

  active: boolean;

  compositionCount: number;

  productionType: string;
}