import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ThemeService } from '../core/services/theme.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TokenService } from '../core/auth/guards/token.service';
import { ProfileService } from '../core/profile/profile.service';
import { PermissionService } from '../core/permissions/permission.service';
import { NotificationService } from '../core/user/notification/notification.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {





  private pageSize = 5;
  userName = '';
  firstName = '';
  companyName = '';
  role = '';

  visibleNotifications: any[] = [];
  notifications: any[] = [];


  constructor(private readonly themeService: ThemeService,
    private router: Router,
    private tokenService: TokenService,
    private profileService: ProfileService,
    private notificationService: NotificationService,
    public permission: PermissionService) {

  }
  ngOnInit(): void {
    this.firstName = this.tokenService.getUserName();
    this.userName =
      this.tokenService.getFullName();

    this.companyName =
      this.tokenService.getCompanyName();



    this.profileService.loadProfile().subscribe({
      next: profile => {

        this.firstName =
          profile.name;

        this.role = this.formatRole(profile.role);
        this.profileService.profileResponse = profile;

        switch (profile.role) {
          case 'ADMIN':
            this.router.navigate(['/dashboard']);
            break;

          case 'SELLER':
            this.router.navigate(['/seller/dashboard']);
            break;

          case 'MANAGER':
            this.router.navigate(['/dashboard']);
            break;

          default:
            this.router.navigate(['/login']);
        }
      }
    });

    this.notificationService.notifications$.subscribe(list => {
      this.notifications = list;
      this.visibleNotifications = this.notifications.slice(0, this.pageSize);
    });

    this.notificationService.loadAllNotifications().subscribe();
    // this.loadNotifications();

    this.notificationService.connect((data) => {
      this.notifications = data;
      this.loadNotifications();

    })
  }

  readMessage(notification: any) {
    const payload = {
      notificationId: notification.notificationId,
      companyId: notification.companyId,
      userId: this.tokenService.getSub(),
      read: true
    }
    this.notificationService.readNotificationV2(payload).subscribe({
      next: response => {
        const item = this.notifications.find(n => n.notificationId === payload.notificationId);

        if (item) {
          item.read = true;
        }
      }
    })
  }
  readMessageV2(notification: any) {
    const payload = {
      notificationId: notification.notificationId,
      companyId: notification.companyId,
      userId: this.tokenService.getSub(),
      read: true
    };

    // Apenas envia a requisição — a atualização do estado local é tratada pelo tap do Service
    this.notificationService.readNotificationV2(payload).subscribe();
  }
  get unreadCount(): number {
    return this.notifications
      .filter(n => !n.read)
      .length;
  }

  loadNotifications() {
    this.notificationService.loadAllNotifications().subscribe({
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

  openNotificationsPage() {
    this.router.navigate(['/notificacoes'])

  }

  loadMore() {
    const nextSize =
      this.visibleNotifications.length +
      this.pageSize;

    this.visibleNotifications =
      this.notifications.slice(
        0,
        nextSize
      );

  }

  private formatRole(role: string): string {

    switch (role) {

      case 'ROLE_OWNER':
      case 'OWNER':
        return 'Administrador';

      case 'ROLE_MANAGER':
      case 'MANAGER':
        return 'Gerente';

      case 'ROLE_USER':
      case 'USER':
        return 'Usuário';
      case 'ROLE_SELLER':
      case 'SELLER':
        return 'Vendedor(ª)';
      default:
        return role;
    }
  }

  get initials(): string {

    const name =
      this.tokenService.getFullName();

    if (!name) {
      return 'HS';
    }

    return name
      .split(' ')
      .filter(x => x)
      .slice(0, 2)
      .map(x => x[0].toUpperCase())
      .join('');
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  myProfile() {
    this.router.navigate(['/profile'])
  }
  changePassword() {
    this.router.navigate(['/profile/change-password'])
  }
  logout() {
    this.router.navigate(['/']);
    localStorage.removeItem('token')
  }
  settings() {
    this.router.navigate(['/profile/settings'])
  }

  teams() {
    this.router.navigate(['profile/teams'])
  }
  permissions() {
    this.router.navigate(['profile/teams/permissions'])
  }
  myCompany() {
    this.router.navigate(['profile/settings/company'])
  }

  resetTutorial() {
    localStorage.removeItem('tour_completed_relsidebar')
    this.router.navigate(['dashboard']);
  }
}
