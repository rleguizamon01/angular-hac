import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {
  
  constructor(
    private auth: AuthService,
    private router: Router
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(this.auth.isLoggedIn() && this.auth.getRole() === "Client"){
        console.info('Logeado: ' + this.auth.isLoggedIn() + ' / Rol: ' + this.auth.getRole());
        return true;
      }
      console.error('Logeado: ' + this.auth.isLoggedIn() + ' / Rol: ' + this.auth.getRole());
      this.router.navigate([this.auth.getRoleUrl()]);
      return false;
  }
  
}
