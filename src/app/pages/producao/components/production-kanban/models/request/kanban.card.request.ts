export interface KanbanCardRequest {
    id?: number;
    itemProductId: number;
    clienteId:string;
    serviceOrderId: number;
    kanbanColumnId: number;
    cardOrder: number;
    productionProgress: number;
    estimatedMinutes: number;
    blocked: boolean;
    blockedReason: string;
    notes: string;
    quantity:number;
    status:string;
}