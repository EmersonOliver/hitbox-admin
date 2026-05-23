import { StockMovementType } from "./stock.movement.type";

export interface StockMovementModel {

  stockMovementId?: number;

  inventoryId: number;

  inventoryName?: string;

  type: StockMovementType;

  quantity: number;

  unitCost: number;

  totalCost: number;

  observation?: string;

  movementDate?: Date;
}