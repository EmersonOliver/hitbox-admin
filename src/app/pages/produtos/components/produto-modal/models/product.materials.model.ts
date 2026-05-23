export interface ProductMaterialResponse {
    productMaterialId: number;

    inventoryId: number;

    inventoryName: string;

    quantity: number;

    consumptionType: 'PER_UNIT' | 'FIXED' | 'OPTIONAL';

    unitCostSnapshot: number;
}