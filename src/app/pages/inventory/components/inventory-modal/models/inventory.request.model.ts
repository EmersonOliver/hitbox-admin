import { InventoryUnit } from "./inventory.model";

export interface InventoryRequest {

  name: string;

  categoriaId: number;

  unit: InventoryUnit;

  minimumStock: number;

  supplier: string;

  location: string;

  active: boolean;

  /**
   * ESTOQUE INICIAL
   */

  initialQuantity?: number;

  initialCost?: number;
}