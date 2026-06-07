import { ProductMaterialResponse } from "./product.materials.model";

export interface ProductResponse {

  productId: number;

  name: string;
  pricingRuleId: number;

  categoryName: string;
  categoriaId: number;

  imageUrl: string;

  sku: string;

  description: string;

  currentCalculatedCost: number;
  currentSalePrice:number;

  productionWeight: number;

  shippingWeight: number;

  materials: ProductMaterialResponse[];

  estimatedMinutes: number;
  imagePreview?:string;
}