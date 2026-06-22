import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamModel } from '../models/team.model';
import { TeamMemberResponse } from '../models/team.member.model';
import { TeamService } from '../../../../core/team/team.service';
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

  form: FormGroup;

  members?: TeamMemberResponse[] = []
  constructor(private router: Router,
    private teamService: TeamService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      email: [null, Validators.required],
      companyId: [null, Validators.required],
      teamId: [null, Validators.required],
      role: ['MANAGER']
    })
  }

  submit() {
  this.form.patchValue({
      companyId: this.teamSelected?.companyId,
      teamId: this.teamSelected?.teamId,
      role: 'MANAGER'
    })
    this.teamService.postInvite(this.form.getRawValue()).subscribe({
      next: response => {
        console.log(response)
      }, error: (error) => {
        console.error(error)
      }
    })
  }

  getInitials(memberFullName: string): string {

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

   formatRole(role: string): string {

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

      default:
        return role;
    }
  }

}
