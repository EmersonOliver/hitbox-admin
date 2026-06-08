import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamModalComponent } from "./team-modal/team-modal.component";
import { AddTeamModalComponent } from "./add-team-modal/add-team-modal.component";
declare var bootstrap: any;
@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TeamModalComponent, AddTeamModalComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent {


  modal: any;
  openModal(): void {
    // const modal =
    //   new bootstrap.Modal(
    //     document.getElementById('teamModal')
    //   );

    // modal.show();
    const modalElement =
      document.getElementById(
        'teamModal'
      );

    if (!modalElement) {
      return;
    }

    this.modal =
      bootstrap.Modal.getOrCreateInstance(
        modalElement
      );

    this.modal.show();
  }

  addTeam() {
    const modalElement =
      document.getElementById(
        'addTeamModal'
      );

    if (!modalElement) {
      return;
    }

    this.modal =
      bootstrap.Modal.getOrCreateInstance(
        modalElement
      );

    this.modal.show();
  }
}
