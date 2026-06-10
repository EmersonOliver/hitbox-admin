import { InventoryModel } from "../../inventory/components/inventory-modal/models/inventory.model";
import { ProductResponse } from "../../produtos/components/produto-modal/models/produto.model";

export interface DashboardResponse {
    receitaTotal: number;
    custoProducao: number;
    lucroLiquido: number;
    ticketMedio: number;
    topProducts: ProductScore[];
    topInventorys: InventoryModel[];

}

export interface ProductScore {
    product: ProductResponse
    score: number;
}