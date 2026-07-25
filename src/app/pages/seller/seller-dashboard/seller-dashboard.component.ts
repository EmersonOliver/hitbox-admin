import { Component } from '@angular/core';
import { TokenService } from '../../../core/auth/guards/token.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from "@angular/router";
import { AttendanceModalComponent } from "../components/attendance-modal/attendance-modal.component";
declare var bootstrap: any;
@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, AttendanceModalComponent],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.scss'
})
export class SellerDashboardComponent {
  openModal(id: string) {
     const modal =
      new bootstrap.Modal(
        document.getElementById(
          id
        )
      );
    modal.show();
  }
  constructor(public tokenService: TokenService) { }

}
