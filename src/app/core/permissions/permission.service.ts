import { Injectable } from '@angular/core';
import { TokenService } from '../auth/guards/token.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(private tokenService: TokenService) { }


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
}
