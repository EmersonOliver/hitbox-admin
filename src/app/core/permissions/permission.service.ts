import { Injectable } from '@angular/core';
import { TokenService } from '../auth/guards/token.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeamPermission } from '../../pages/profile/team/models/team.permissions.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(private tokenService: TokenService, private httpCliente:HttpClient) { }


  has(permission: string): boolean {
    return this.tokenService
      .hasPermission(permission);
  }

  hasAny(...permissions: string[]): boolean {

    return this.tokenService
      .hasAnyPermission(...permissions);

  }

  hasAll(...permissions: string[]): boolean {

    return this.tokenService
      .hasAllPermissions(...permissions);

  }

  loadPermissionsByTeamId(teamId:string):Observable<TeamPermission[]>{
    return this.httpCliente.get<TeamPermission[]>(`api/usuario/hitbox/permissions/byTeam/${teamId}`).pipe();
    
  }

  updateAllPermisions(payload:any):Observable<any> {
    return this.httpCliente.put<any>('api/usuario/hitbox/permissions/update', payload).pipe();
  }
}
