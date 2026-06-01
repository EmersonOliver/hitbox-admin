export interface KanbanCardMovementRequest {
     id?:number;
     cardId:number;
     serviceOrderId:number;
     fromColumnId:number;
     toColumnId:number;
}