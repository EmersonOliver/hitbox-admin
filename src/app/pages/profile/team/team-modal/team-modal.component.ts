import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'app-team-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './team-modal.component.html',
  styleUrl: './team-modal.component.scss'
})
export class TeamModalComponent {
  constructor(private router: Router) {
  }

  users() {
    this.router.navigate(['profile/teams/users']);
    this.fecharModal();

  }
  permissions() {
    this.router.navigate(['profile/teams/permissions'])
    this.fecharModal();

  }

  fecharModal() {
    const modalElement =
      document.getElementById(
        'teamModal'
      );

    if (!modalElement) {
      return;
    }

    const modal =
      bootstrap.Modal.getInstance(
        modalElement
      );

    modal?.hide();

  }

}
