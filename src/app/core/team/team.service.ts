import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPage } from '../api/api.response.model';
import { TeamModel } from '../../pages/profile/team/models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }


  postTeam(payload: any): Observable<any> {
    return this.http.post<any>('api/usuario/hitbox/team/create', payload).pipe();
  }

  listProfileTeams(): Observable<ApiPage<TeamModel>> {
    return this.http.get<any>('api/usuario/hitbox/team/list/all/teams', {
      params: { page: 0, size: 10 }
    });
  }

  postInvite(payload:any):Observable<any>{
    return this.http.post<any>('api/usuario/hitbox/membership/invite', payload).pipe();
  }

  listByTeam(teamId:string):Observable<TeamModel> {
    return this.http.get<TeamModel>(`api/usuario/hitbox/team/findByTeamId/${teamId}`).pipe();
  }

  loadAllTeams():Observable<TeamModel[]>{
    return this.http.get<TeamModel[]>('api/usuario/hitbox/team/load/all/teams/withoupages').pipe();
  }
}
