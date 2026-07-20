import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPage } from '../../api/api.response.model';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private client!: Client;

  constructor(private http: HttpClient) { }

  listAllNotifications(page: number, size: number): Observable<ApiPage<any>> {
    return this.http.get<ApiPage<any>>('api/usuario/hitbox/notifications/all', {
      params: { page: page, size: size }
    }).pipe();
  }

  connect(callback: (msg: any) => void) {
    let token = localStorage.getItem('token');
    this.client = new Client({
      webSocketFactory: () =>
        new SockJS(
          `/api/usuario/hitbox/ws?token=${token}`
        ),

      connectHeaders: {
        Authorization: `Bearer ${token}`
      },

      reconnectDelay: 5000
    });


    this.client.onConnect = () => {
      this.client.subscribe('/queue/notifications', message => {
        callback(JSON.parse(message.body));
      });
    };

    this.client.activate();
  }

  listAllNotificationsV2(): Observable<any[]> {
    return this.http.get<any[]>('api/usuario/hitbox/notifications/v2/all').pipe();
  }
  readNotification(payload: any): Observable<any> {
    return this.http.post<any>('api/usuario/hitbox/notifications/read', payload).pipe();
  }
}
