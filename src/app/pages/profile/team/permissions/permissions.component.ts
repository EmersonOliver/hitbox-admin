import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../../core/team/team.service';
import { TeamModel } from '../models/team.model';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../components/toast/toast.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.scss'
})
export class PermissionsComponent implements OnInit {

  team?: TeamModel | null = null
  teams: TeamModel[] = []

  form: FormGroup;

  constructor(
    private teamPermissionService: TeamService,
    private fb: FormBuilder,
    private toast: ToastService,
    private activatedRoute: ActivatedRoute) {

    this.form = this.fb.group({
      teamId: [null, Validators.required]
    });

  }

  ngOnInit(): void {
    const teamId = this.activatedRoute.snapshot.paramMap.get('teamId') || undefined;

    this.teamPermissionService.loadAllTeams().subscribe({
      next: response => {
        this.teams = response;
        if (teamId) {
          this.teamPermissionService.listByTeam(teamId).subscribe({
            next: response => {
              this.team = response
              this.form.patchValue({
                teamId: this.team.teamId
              })
            },
            error: (error) => {
              this.toast.show('Ocorreu um erro na requisição!' + error.error.message, 'danger');
            }
          });
        }
      }
    });

  }

}
