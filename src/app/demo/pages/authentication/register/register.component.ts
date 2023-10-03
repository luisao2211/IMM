import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from '../apiservice/authentication.service';
import { Emails } from '../apiservice/authentication.interface';
import { error } from 'jquery';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule, ReactiveFormsModule,HttpClientModule],
  providers:[AuthService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent {
  public Emails:Emails;
  registerForm: FormGroup;
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
createRegisterForm() {
  this.registerForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required,Validators.minLength(6)])

    }
  )
}
ngOnInit(): void {
  this.createRegisterForm()
  this.onEmails();
}
onEmails(){
  this.AuthService.dataEmails().subscribe({
    next:(n)=>{
      this.Emails = n["data"]["result"]
      console.log(this.Emails)
    },
    error:(e)=>{

    },
    
    
  })
}

onSubmit() {
  for (const key in this.Emails) {
    if (Object.hasOwnProperty.call(this.Emails, key)) {
      const email = this.Emails[key];
      console.log(this.registerForm.value.email, email.email);
      if (this.registerForm.value.email === email.email) { // Cambio aquí de = a ===
        this.registerForm.reset();
        this.Toast.fire({
          position: 'top-end',
          icon: 'error',
          title: `El correo ya existe`,
        });
        return;
      }
    }
  }

  // Resto del código si el correo no existe
  this.AuthService.NeUser(this.registerForm.value).subscribe({
    next: (n) => {
      this.Toast.fire({
        position: 'top-end',
        icon: 'success',
        title: `Bienvenida. Por favor inicia sesión.`,
      });
      this.router.navigateByUrl('/autenticacion/iniciosesion');
    },
    error: (e) => {
      this.Toast.fire({
        position: 'top-end',
        icon: 'error',
        title: `No has podido registrarte.`,
      });
    },
  });
}

}
