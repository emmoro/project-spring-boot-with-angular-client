import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { HttpUtilService } from '../../shared';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private httpUtilService: HttpUtilService,
    private router: Router) {}

  canActivate(): boolean {
    if (this.httpUtilService.getProfile() === 'ROLE_ADMIN') {
      return true;
    }

    this.router.navigate(['/user']);
    return false;
  }

}