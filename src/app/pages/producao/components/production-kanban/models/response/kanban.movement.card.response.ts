export interface KanbanCardMovementResponse {
    id:number;
    cardId:number;
    serviceOrderId:number;
    fromColumnId:number;
    toColumnId:number;
    fromColumnName:string;
    toColumnName:string;
     movedAt:Date;
}