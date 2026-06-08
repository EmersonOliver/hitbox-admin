export interface KanbanCardResponse {
    id: number;
    itemProductId: number;
    serviceOrderId: number;
    kanbanColumnId: number;
    cardOrder: number;
    productionProgress: number;
    estimatedMinutes: number;
    actualMinutes: number;
    blocked: boolean;
    blockedReason: string;
    notes: string;
    startDatetime: Date;
    finishDatetime: Date;
    createdAt: Date;
    updatedAt: Date;
    productName: string;
    productImage: string;
    clientName: string;
    clienteId:string;
    quantity: number;
    status:string;

}