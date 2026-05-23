import { CategoriaModel } from "../../../../categorias/model/categoria.model";

export interface InventoryModel {
  id?: number;
  name: string;
  categoriaId:number;
  categoria: CategoriaModel;
  quantity: number;
  unit: InventoryUnit;
  minimumStock: number;
  cost: number;
  unitCost:number;
  supplier: string;
  location: string;
  imageUrl: string;
  active: boolean;
}

export enum InventoryUnit {

  GRAMA = 'GRAMA',

  QUILOGRAMA = 'QUILOGRAMA',

  UNIDADE = 'UNIDADE',

  METRO = 'METRO',

  LITRO = 'LITRO'
}