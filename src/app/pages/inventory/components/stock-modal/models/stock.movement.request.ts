import { StockMovementType } from "./stock.movement.type";

export interface StockMovementRequest {

  type: StockMovementType;

  quantity: number;

  totalCost?: number;

  observation?: string;
}