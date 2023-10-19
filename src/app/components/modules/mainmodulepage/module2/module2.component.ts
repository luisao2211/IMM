import { Component } from '@angular/core';
import { Inputs } from '../../interfaces/inputs.interface';
import { ModulesService } from '../../services/modules.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-module2',
  templateUrl: './module2.component.html',
  styleUrls: ['./module2.component.scss']
})
export class Module2Component {
  comunity:Inputs[]
  isSave:false
  id:number
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
  constructor(private ServiceModule2: ModulesService<any>){
    this.createComunnity()
  }
  createComunnity(){
    this.comunity=
    [
      {
        label: "Fecha",
        formcontrolname: "date",
        type:'date'
        
      },
     {
      label:"Lugar",
      formcontrolname:"location",
      width: 2

     },
     {
      label:"agente",
      formcontrolname:"agent"
      
     },
     {
      label:"En colaboración",
      formcontrolname:"colaboration"
      
     },
     {
      label:"Ponente(s)",
      formcontrolname:"ponent"
      
     },
     {
      label:"Temas",
      formcontrolname:"issue"
      
     },
     {
      label: "Nombre",
      formcontrolname: "name",
    },
    {
      label: "Apellido Paterno",
      formcontrolname: "lastName",
    },
    {
      label: "Apellido Materno",
      formcontrolname: "secondName",
    },
    {
      label: "Sexo",
      type: "radio",
      formcontrolname: "sex",
      radiobutton: [{
        text: "Hombre",
        value: "0"
      },
      {
        text: "Mujer",
        value: "1"
      }
      ]
    },
     
    {
      label: "Cp",
      type: "cp",
      formcontrolcp: "cp",
      formcontrolname: "colonies_id",
      formcontrolmunicipy: "municipy",
      formcontrolstate: "state"
    },
    {
      label: "Dependencia o Institucion",
      formcontrolname: "dependece",
    },
    {
      label: "Télefono",
      type: "phone",
      formcontrolname: "telephone",
    },
    {
      label: "Correo electrónico",
      type: "email",
      formcontrolname: "email",
    },
    {
      label: "Eje",
      type: "doubleselect",
      formcontrolname: "axi_id",
      url: "axis/selectIndex",
      secondlabel: "Programa",
      secondcontrolname: "axi_program_id",
      urloadata: "axisprogram/types",
      
    },
    {
      label: "Observación",
      formcontrolname: "observations",
      width:10
    },
    {
      label: "Banco de memorias Fotograficas",
      formcontrolname: "files",
      width:10,
      files:[],
      fileCont:0,
      type:'file'
    },
    {
      label:"hidden",
      formcontrolname:"module",
      type:"hidden",
      value:2
    }
    ]
  }
  Submit(event){
    console.error(event.files)
    const files = event.files
    for (const [formDataKey, formDataValue] of files.entries()) {
      console.log(formDataKey, formDataValue);
    }
    this.ServiceModule2.Post( "userdatageneral",event).subscribe({
      next:(n)=>{
        this.id = n["data"]["result"];

        this.Toast.fire({
          position: 'top-end',
          icon: 'success',
          title: `Se ha insertado`,

        })  
      },
      error:(e)=>{
        this.Toast.fire({
          position: 'top-end',
          icon: 'error',
          title: `No se ha podido insertar`,
        })  
      },
      complete :()=>{
        files.append("id",this.id)

        this.ServiceModule2.Post( "userdatageneral",files).subscribe({
          next:(n)=>{
            this.Toast.fire({
              position: 'top-end',
              icon: 'success',
              title: `Se ha insertado`,
            })  
          },
          error:(e)=>{
            this.Toast.fire({
              position: 'top-end',
              icon: 'error',
              title: `No se ha podido insertar`,
            })  
          },
          complete :()=>{
            
          }
        })
      }
    })

  }
}
