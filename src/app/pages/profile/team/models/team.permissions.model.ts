import { TeamPermissionItem } from "./team.permission.item.model";

export interface TeamPermission {
    moduleId: string;
    moduleCode: string;
    moduleName: string;
    permissions: TeamPermissionItem[];
}