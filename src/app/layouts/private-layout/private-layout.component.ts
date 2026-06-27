import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from "@angular/router";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { HeaderComponent } from "../../header/header.component";
import { CommonModule } from '@angular/common';
import { PermissionService } from '../../core/permissions/permission.service';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, RouterModule, HeaderComponent, CommonModule],
  templateUrl: './private-layout.component.html',
  styleUrl: './private-layout.component.scss'
})
export class PrivateLayoutComponent {

  constructor(public permission: PermissionService) { }


}
