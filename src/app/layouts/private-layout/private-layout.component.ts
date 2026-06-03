import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { HeaderComponent } from "../../header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, CommonModule],
  templateUrl: './private-layout.component.html',
  styleUrl: './private-layout.component.scss'
})
export class PrivateLayoutComponent {

}
