import { Component } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { HeaderComponent } from "../../header/header.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-seller-layout',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, RouterOutlet],
  templateUrl: './seller-layout.component.html',
  styleUrl: './seller-layout.component.scss'
})
export class SellerLayoutComponent {

}
