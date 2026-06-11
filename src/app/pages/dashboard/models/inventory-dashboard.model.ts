import { InventoryModel } from "../../inventory/components/inventory-modal/models/inventory.model";

export interface InventoryDashboardResponse {

  inventory: InventoryModel;

  purchasedQuantity: number;

  consumedQuantity: number;

  currentQuantity: number;

  minimumStock: number;

  stockCoveragePercent: number;

  totalPurchasedValue: number;

  totalConsumedValue: number;

  currentStockValue: number;

  averageUnitCost: number;

  lastEntryDate?: string;

  lastConsumptionDate?: string;

  entriesHistory: MonthlyInventoryEntryDTO[];

  consumptionHistory: MonthlyInventoryConsumptionDTO[];
}

export interface MonthlyInventoryEntryDTO {

  year: number;

  month: number;

  quantity: number;

  value: number;
}

export interface MonthlyInventoryConsumptionDTO {

  year: number;

  month: number;

  quantity: number;

  value: number;
}