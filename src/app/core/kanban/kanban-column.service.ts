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

    return this.http.get<KanbanColumnResponse[]>(
      `${this.API}/find-all`
    );
  }

  create(
    request: KanbanColumnRequest
  ): Observable<KanbanColumnResponse> {

    return this.http.post<KanbanColumnResponse>(
      `${this.API}/create`,
      request
    );
  }

  update(
    request: KanbanColumnRequest
  ): Observable<KanbanColumnResponse> {

    return this.http.put<KanbanColumnResponse>(
      `${this.API}/edit/${request.id}`,
      request
    );
  }

  delete(
    columnId: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.API}/delete/${columnId}`
    );
  }
}
