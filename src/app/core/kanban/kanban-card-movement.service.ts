import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KanbanCardMovementRequest } from '../../pages/producao/components/production-kanban/models/request/kanban.card.movement.request';
import { KanbanCardMovementResponse } from '../../pages/producao/components/production-kanban/models/response/kanban.movement.card.response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KanbanCardMovementService {
  private readonly API =
    `api/hitbox/kanban/card-movement`;
  constructor(private http: HttpClient) { }

  create(
    request: KanbanCardMovementRequest
  ): Observable<KanbanCardMovementResponse> {
    let token = localStorage.getItem('token');

    return this.http.post<KanbanCardMovementResponse>(
      `${this.API}/create`,
      request, {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    );
  }

  findByCard(
    cardId: number
  ): Observable<KanbanCardMovementResponse[]> {
  let token = localStorage.getItem('token');
    return this.http.get<KanbanCardMovementResponse[]>(
      `${this.API}/find-by-card/${cardId}`,{
           headers: { 'Authorization': `Bearer ${token}` }
      }
    );
  }
}
