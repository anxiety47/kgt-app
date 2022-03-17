import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}
  
  canActivate(): boolean {
    if(this.authService.isLoggedIn) {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}