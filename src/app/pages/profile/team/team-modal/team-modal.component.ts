import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamModel } from '../models/team.model';
import { TeamMemberResponse } from '../models/team.member.model';
declare var bootstrap: any;
@Component({
  selector: 'app-team-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './team-modal.component.html',
  styleUrl: './team-modal.component.scss'
})
export class TeamModalComponent implements OnChanges {

  @Input()
  teamSelected?: TeamModel | null = null;

  members?: TeamMemberResponse[] = []
  constructor(private router: Router) {
  }

  getInitials(memberFullName:string): string {

    if (!memberFullName) {
      return 'HS';
    }

    return memberFullName
      .split(' ')
      .filter(x => x)
      .slice(0, 2)
      .map(x => x[0].toUpperCase())
      .join('');
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['teamSelected']) {
      this.members = this.teamSelected?.members
    }
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
