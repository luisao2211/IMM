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
        label:"Fecha",
        formcontrolname:"date",
        type:'date'     
      },
      {
        label:"Lugar",
        formcontrolname:"location",
      },
      {
        label:"agente",
        formcontrolname:"agent"
      },
      {
        label:"En colaboración",
        formcontrolname:"colaboration",
      },
      {
        label:"Ponente(s)",
        formcontrolname:"ponts"
      },
      {
        label:"speakers",
        formcontrolname:"issue"
      },
      {
        label:"nombre",
        formcontrolname: "name",
      },
     
      {
        label:"Sexo",
        type:"radio",
        formcontrolname: "sex",
        radiobutton:[{
          text:"Hombre",
          value:"0"
        },
        {
          text:"Mujer",
          value:"1"
        }
      ]
      },
      {
        label:"Cp",
        type:"number",
        formcontrolname: "cp", 
      },
      {
        label:"Colonia",
        formcontrolname: "colonie", 
        value:"colonia",
        disabled: true
      },
      {
        label:"Municipio",
        formcontrolname: "municipy", 
        value:"municipy",
        disabled: true
      },
      {
        label:"Estado",
        formcontrolname: "state", 
        value:"state",
        disabled: true
      },
      {
        label:"Dependecia o Institución",
        formcontrolname:"depence"
      },
      {
        label:"telefono",
        formcontrolname: "telephone",
        type:'number',

      },
      {
        label:"Córreo electrónico",
        formcontrolname: "email",
        type:'email',

      },
      {
        label:"observación",
        formcontrolname: "axis", 

      },
      {
        label:"Eje",
        type:"doubleselect",
        formcontrolname: "axis", 
        url:"axis/selectIndex",
        secondlabel:"Programa",
        secondcontrolname:"axisprogram",
        urloadata:"axisprogram/types/",

      },
    ]
  }
}
