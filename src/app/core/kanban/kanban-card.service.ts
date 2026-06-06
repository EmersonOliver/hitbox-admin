import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KanbanCardRequest } from '../../pages/producao/components/production-kanban/models/request/kanban.card.request';
import { Observable } from 'rxjs';
import { KanbanCardResponse } from '../../pages/producao/components/production-kanban/models/response/kanban.card.response';

@Injectable({
  providedIn: 'root'
})
export class KanbanCardService {
  private readonly API =
    `api/hitbox/kanban/card`;
  constructor(private http: HttpClient) { }
  create(
    request: KanbanCardRequest
  ): Observable<KanbanCardResponse> {
    let token = localStorage.getItem('token');
    return this.http.post<KanbanCardResponse>(
      `${this.API}/create`,
      request, {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    );
  }

  update(
    request: KanbanCardRequest
  ): Observable<KanbanCardResponse> {
    let token = localStorage.getItem('token');
    return this.http.put<KanbanCardResponse>(
      `${this.API}/edit/${request.id}`,
      request, {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    );
  }

  delete(
    cardId: number
  ): Observable<void> {
    let token = localStorage.getItem('token');
    return this.http.delete<void>(
      `${this.API}/delete/${cardId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    );
  }
}
