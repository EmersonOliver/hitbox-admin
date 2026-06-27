import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamModalComponent } from "./team-modal/team-modal.component";
import { AddTeamModalComponent } from "./add-team-modal/add-team-modal.component";
import { TeamService } from '../../../core/team/team.service';
import { UserService } from '../../../core/user/user.service';
import { TeamModel } from './models/team.model';
import { UserResponse } from '../../register/models/user.response';
import { ToastComponent } from "../../components/toast/toast.component";
declare var bootstrap: any;
@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TeamModalComponent, AddTeamModalComponent, ToastComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent implements OnInit {

  teams: TeamModel[] = [];
  teamSelected?: TeamModel;
  owners: UserResponse[] = [];

  constructor(private teamService: TeamService, private userService: UserService) {

  }
  ngOnInit(): void {
    this.userService.loadUsersByRole('OWNER').subscribe({
      next: response => {
        this.owners = response;
      }
    });
    this.loadTeams();

  }
  loadTeams() {
    this.teamService.listProfileTeams().subscribe({
      next: response => {
        this.teams = response.content;
      }
    })
  }

  modal: any;
  openModal(team: TeamModel): void {
    this.teamSelected = team;
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
