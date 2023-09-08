// Angular import
import {Router } from '@angular/router';
import { AuthService } from '../../../../../demo/pages/authentication/apiservice/authentication.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {
  constructor(public AuthService:AuthService,private router: Router){

  }
  logout(){
    this.AuthService.Logout(parseInt(localStorage.getItem('id'))).subscribe({
      next:(n)=>{
        localStorage.clear()
        this.router.navigateByUrl("/autenticacion/iniciosesion")
      }
    })
  }
}
