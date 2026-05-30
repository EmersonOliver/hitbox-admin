import { KanbanCardResponse } from "./kanban.card.response";

export interface KanbanColumnResponse {
    id: number;
    columnName: string;
    columnColor: string;
    columnOrder: number;
    totalCards: number;
    cards: KanbanCardResponse[];
    typeColumn:string;
}