import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../core/user/notification/notification.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from '../../core/auth/guards/token.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit {

  notifications: any[] = [];
  visibleNotifications: any[] = [];
  private pageSize = 5;

  ngOnInit(): void {
    // Inscreve no BehaviorSubject
    // this.notificationService.notifications$.subscribe(list => {
    //   this.notifications = list;
    // });

    // // Se a lista estiver vazia ao abrir a tela, carrega do servidor
    // if (this.notifications.length === 0) {
    //   this.notificationService.loadAllNotifications().subscribe({
    //     next: response => this.notifications = response
    //   });
    // }
    this.notificationService.notifications$.subscribe(list => {
      this.notifications = list;
    });
 
  }

  constructor(private notificationService: NotificationService, private tokenService: TokenService, private title:Title) { 
    this.title.setTitle('ERSO ERP - Notificações')
  }

  loadNotifications() {
    this.notificationService.listAllNotificationsV2().subscribe({
      next: response => {

        const ordenadas = [...response].sort((a, b) => Number(a.read) - Number(b.read));
        this.notifications = ordenadas
        this.visibleNotifications =
          this.notifications.slice(
            0,
            this.pageSize
          );
      }
    });
  }
  readMessage(notification: any) {
    const payload = {
      notificationId: notification.notificationId,
      companyId: notification.companyId,
      userId: this.tokenService.getSub(),
      read: true
    };

    this.notificationService.readNotificationV2(payload).subscribe();
  }
}
