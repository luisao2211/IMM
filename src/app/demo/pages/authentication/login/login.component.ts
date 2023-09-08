import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from '../apiservice/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule, ReactiveFormsModule,HttpClientModule],
  providers:[AuthService],

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  public email:String
  public password :String

    loginForm: FormGroup;
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
  constructor(public AuthService:AuthService,private router: Router){
  
  }
  createLoginForm() {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required,Validators.email]),
        password: new FormControl('', [Validators.required])
  
      }
    )
  }
  ngOnInit(): void {
    this.createLoginForm()
  }

  
  onSubmit() {
   
  
    // Resto del código si el correo no existe
    this.AuthService.Login(this.loginForm.value).subscribe({
      next: (n) => {
        console.log(n["data"]["result"]["token"])
        localStorage.setItem('token', n["data"]["result"]["token"]);
        localStorage.setItem('id', n["data"]["result"]["user"]["id"]);

        this.router.navigateByUrl('/defecto');
      },
      error: (e) => {
        this.Toast.fire({
          position: 'top-end',
          icon: 'error',
          title: `Credenciales incorrectas.`,
        });
      },
    });
  }
  
}


