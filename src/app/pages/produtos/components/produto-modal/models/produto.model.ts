import { ProductMaterialResponse } from "./product.materials.model";

export interface ProductResponse {

  productId: number;

  name: string;

  categoryName: string;
  categoriaId: number;

  imageUrl: string;

  sku: string;

  description: string;

  currentCalculatedCost: number;

  productionWeight: number;

  shippingWeight: number;

  materials: ProductMaterialResponse[];
}