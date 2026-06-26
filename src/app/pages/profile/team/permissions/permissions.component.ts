import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../../core/team/team.service';
import { TeamModel } from '../models/team.model';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../components/toast/toast.service';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.scss'
})
export class PermissionsComponent implements OnInit {

  team?: TeamModel | null = null

  constructor(
    private teamPermissionService: TeamService,
    private toast: ToastService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const teamId = this.activatedRoute.snapshot.paramMap.get('teamId') || undefined;
    if (teamId)
      this.teamPermissionService.listPermissionByTeam(teamId).subscribe({
        next: response => {
          this.team = response
          console.log(this.team)
        },
        error: (error) => {
          this.toast.show('Ocorreu um erro na requisição!' + error.error.message, 'danger');
        }
      });

  }

}
