// Angular import
import {Router } from '@angular/router';
import { AuthService } from '../../../../../demo/pages/authentication/apiservice/authentication.service';
import { Component } from '@angular/core';
import { ModulesService } from 'src/app/components/modules/services/modules.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {
  public Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  constructor(public AuthService:ModulesService<any>,private router: Router){

  }
  logout(){
    this.AuthService.Logout("auth/logout").subscribe({
      next:(n)=>{
        this.Toast.fire({
          position: 'top-end',
          icon: 'success',
          title: `Se a cerrado tu sesión`,
        })
        localStorage.clear()
        this.router.navigateByUrl("/autenticacion/iniciosesion")
      },error:(e)=>{

        this.Toast.fire({
          position: 'top-end',
          icon: 'error',
          title: `No se ha podido cerrar la sesíon`,
        })
      }
    })
  }
}
