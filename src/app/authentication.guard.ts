import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    // Verifica si el token de autenticación existe en el Local Storage
    const authToken = localStorage.getItem('token');

    if (authToken) {
      // Si el token existe, permite el acceso a la ruta
      return true;
    } else {
      // Si el token no existe, redirige a la página de inicio de sesión o a otra página
      this.router.navigate(['/autenticacion/iniciosesion']); // Cambia '/login' al enrutamiento que desees
      return false;
    }
  }
}
