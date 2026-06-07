import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from './token.service';

export const guestGuard: CanActivateFn = () => {

  const tokenService =
    inject(TokenService);

  const router =
    inject(Router);

  const token =
    tokenService.getToken();

  if (token) {

    router.navigate([
      '/dashboard'
    ]);

    return false;
  }

  return true;
};