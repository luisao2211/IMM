import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationloginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const authToken =localStorage.getItem('token')
    if (authToken) {
      this.router.navigate(['/defecto']); // Cambia '/login' al enrutamiento que desees

      return false;
    } else {
      return true;
    }
  }
}
