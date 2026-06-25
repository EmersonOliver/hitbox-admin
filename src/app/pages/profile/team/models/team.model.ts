import { TeamMemberResponse } from "./team.member.model";

export interface TeamModel {

  teamId: string;
  companyId: string;
  teamName: string;
  description: string;
  active: boolean;
  defaultTeam: boolean;
  totalMembers: number;
  createdAt: Date;
  updatedAt: Date;
  members: TeamMemberResponse[];

}