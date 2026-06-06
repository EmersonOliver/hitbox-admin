import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KanbanColumnResponse } from '../../pages/producao/components/production-kanban/models/response/kanban.column.response';
import { Observable } from 'rxjs';
import { KanbanColumnRequest } from '../../pages/producao/components/production-kanban/models/request/kanban.column.request';

@Injectable({
  providedIn: 'root'
})
export class KanbanColumnService {

  private readonly API =
    `api/hitbox/kanban/column`;
  constructor(private http: HttpClient) { }

  findAll(): Observable<KanbanColumnResponse[]> {
    let token = localStorage.getItem('token');
    return this.http.get<KanbanColumnResponse[]>(
      `${this.API}/find-all`, { headers: { 'Authorization': `Bearer ${token}` } }
    );
  }

  create(
    request: KanbanColumnRequest
  ): Observable<KanbanColumnResponse> {
    let token = localStorage.getItem('token');
    return this.http.post<KanbanColumnResponse>(
      `${this.API}/create`,
      request, { headers: { 'Authorization': `Bearer ${token}` } }
    );
  }

  update(
    request: KanbanColumnRequest
  ): Observable<KanbanColumnResponse> {
    let token = localStorage.getItem('token');
    return this.http.put<KanbanColumnResponse>(
      `${this.API}/edit/${request.id}`,
      request, { headers: { 'Authorization': `Bearer ${token}` } }
    );
  }

  delete(
    columnId: number
  ): Observable<void> {
    let token = localStorage.getItem('token');
    return this.http.delete<void>(
      `${this.API}/delete/${columnId}`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
  }
}
