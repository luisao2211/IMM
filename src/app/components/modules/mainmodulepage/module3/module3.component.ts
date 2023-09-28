import { Component } from '@angular/core';
import { Inputs } from '../../interfaces/inputs.interface';

@Component({
  selector: 'app-module3',
  templateUrl: './module3.component.html',
  styleUrls: ['./module3.component.scss']
})
export class Module3Component {
  activities:Inputs[]
  constructor(){
    this.createActivitys()
  }
  createActivitys(){
    this.activities = [
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
        label:"Actividad",
        type:"select",
        formcontrolname: "activities", 
        url:"activity/selectIndex"
       },
       {
        label:"Organiza",
        formcontrolname:"organization",
      },
      {
        label:"En colaboración",
        formcontrolname:"colaboration",
      },
      {
        label:"Poblacion beneficiada",
        formcontrolname:"comunity",
      },
      {
        label:"Descripción",
        formcontrolname:"description",
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
