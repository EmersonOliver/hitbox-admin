import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../../core/team/team.service';
import { TeamModel } from '../models/team.model';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../components/toast/toast.service';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PermissionService } from '../../../../core/permissions/permission.service';
import { TeamPermission } from '../models/team.permissions.model';
import { TeamPermissionItem } from '../models/team.permission.item.model';
import { ToastComponent } from "../../../components/toast/toast.component";

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ToastComponent],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.scss'
})
export class PermissionsComponent implements OnInit {

  team?: TeamModel | null = null
  teams: TeamModel[] = []
  permissions?: TeamPermission[] | null;

  form: FormGroup;

  constructor(
    private teamPermissionService: TeamService,
    private fb: FormBuilder,
    private permissionsService: PermissionService,
    private toast: ToastService,
    private activatedRoute: ActivatedRoute) {

    this.form = this.fb.group({
      teamId: [null, Validators.required],
      teamPermissions: this.fb.array([])
    });

  }

  get permissionsArrayForm(): FormArray {
    return this.form.get('teamPermissions') as FormArray;
  }

  permissionsOf(moduleIndex: number): FormArray {
    return this.permissionsArrayForm
      .at(moduleIndex)
      .get('permissions') as FormArray;
  }

  getPermissions(moduleIndex: number): FormArray {

    return this.permissionsArrayForm
      .at(moduleIndex)
      .get('permissions') as FormArray;

  }
  criarTeamPermission(teamPermission: TeamPermission): FormGroup {

    return this.fb.group({
      moduleId: [teamPermission.moduleId],
      moduleCode: [teamPermission.moduleCode],
      moduleName: [teamPermission.moduleName],
      permissions: this.fb.array(
        teamPermission.permissions.map(p => this.criarPermission(p))
      )

    });
  }


  criarPermission(permissionItem: TeamPermissionItem): FormGroup {
    return this.fb.group({
      permissionId: [permissionItem.permissionId, Validators.required],
      permissionCode: [permissionItem.permissionCode, Validators.required],
      permissionName: [permissionItem.permissionName, Validators.required],
      teamPermissionId: [permissionItem.teamPermissionId, Validators.required],
      granted: [permissionItem.granted]
    });
  }


  private addPermission(
    moduleIndex: number,
    permission: TeamPermissionItem
  ) {

    this.getPermissions(moduleIndex)
      .push(this.criarPermission(permission));

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

  loadPermissionsByIdTeam(teamId: string) {
    this.permissionsService.loadPermissionsByTeamId(teamId).subscribe({
      next: response => {
        this.permissions = response;
        this.permissionsArrayForm.clear();
        response.forEach(permission => {
          this.permissionsArrayForm.push(
            this.criarTeamPermission(permission)
          );

        });
      }
    })
  }

  savePermissions() {
    console.log(this.form.getRawValue())
    this.permissionsService.updateAllPermisions(this.form.getRawValue()).subscribe({
      next:()=>{
        this.loadPermissionsByIdTeam(this.form.get('teamId')?.value);
        this.toast.show('Alterações salvas com sucesso!', 'success')
      }
    })
  }

}
