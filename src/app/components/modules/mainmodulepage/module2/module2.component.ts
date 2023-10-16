import { Component } from '@angular/core';
import { Inputs } from '../../interfaces/inputs.interface';

@Component({
  selector: 'app-module2',
  templateUrl: './module2.component.html',
  styleUrls: ['./module2.component.scss']
})
export class Module2Component {
  comunity:Inputs[]
  constructor(){
    this.createComunnity()
  }
  createComunnity(){
    this.comunity=
    [
     {
      label:"Nombre",
      formcontrolname:"Nombre",
      width: 2

     },
     {
      label:"Nombre",
      formcontrolname:"Nombre"
      
     },
     {
      label: "Estado Civil",
      type: "checkbox",
      formcontrolname: "civil_status_id",
      url: "civilstatus/selectIndex"
    },
     
    ]
  }
}
