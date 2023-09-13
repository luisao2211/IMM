import { Component, ViewChild } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { Inputs } from '../../interfaces/inputs.interface';
import { Gender } from '../../../catalogues/maingender/apiservice/intefacegender';
import { GenderService } from '../../../catalogues/maingender/apiservice/gender.service';
import { SelectIndex } from '../../interfaces/selects.iterface';
import { MatStepper } from '@angular/material/stepper';
import { event } from 'jquery';

@Component({
  selector: 'app-module1',
  templateUrl: './module1.component.html',
  styleUrls: ['./module1.component.scss']
})
export class Module1Component {
  contNewForm: number = 0
  generalData:Inputs[] 
  userProfille:Inputs[]
  violenceCase:Inputs[]
  profileAggressor:Inputs[]
  services:Inputs[]
  genders: SelectIndex[]
  @ViewChild(MatStepper) stepper: MatStepper;
  isLinear = true;
  methods = [
    this.CreateGeneralData.bind(this),
    this.CreateUserProfile.bind(this),
    this.CreateViolenceCase.bind(this),
    this.CreateProfileAggresor.bind(this),
    this.CreateServices.bind(this),
  ];
  
  NextStepper(event:boolean) {
    if (this.contNewForm < this.methods.length) {
        this.methods[this.contNewForm]();
        this.contNewForm ++
    }
    this.stepper.next();
   
  }

  constructor(private GenderService:GenderService) {
    this.methods[this.contNewForm]();
    this.contNewForm ++

  }
  ngAfterViewInit() {
    // Deshabilitar la navegación por clic en los títulos de los pasos
    const stepHeaders = document.querySelectorAll('.mat-step-header');
    stepHeaders.forEach((header: HTMLElement) => {
      header.style.pointerEvents = 'none';
    });
  }
  CreateGeneralData(){
    this.generalData = [
      {
      label:"Expediente",
      formcontrolname: "proceedings",
      },
      {
        label:"Fecha de ingreso",
        formcontrolname:"dateingress",
        value: new Date().toLocaleDateString('en-GB'), 
        disabled: true
      },
      {
        label:"Hora de ingreso",
        formcontrolname:"timeingress",
        value: new Date().toLocaleTimeString(), // Obtener la hora actual
        disabled: true
      },
      {
        label:"nombre",
        formcontrolname: "name",
      },
      {
        label:"Apellido Paterno",
        formcontrolname: "lastname",
      },
      {
        label:"Apellido Materno",
        formcontrolname: "motherslastname",
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
        label:"Genero",
        type:"select",
        formcontrolname: "gender", 
        url:"genders/selectIndex"
      },
      {
        label:"Fecha de nacimiento",
        type:"date",
        formcontrolname: "birthdate", 
      },
      {
        label:"Edad",
        type:"number",
        formcontrolname: "age", 
      },
      {
        label:"Calle",
        formcontrolname: "street", 
      },
      {
        label:"Numero",
        type:"number",
        formcontrolname: "numberstreet", 
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
        label:"Zona de pertenencia",
        type:"radio",
        formcontrolname: "zonepertenence",
        radiobutton:[{
          text:"Urbana",
          value:"0"
        },
        {
          text:"Rural",
          value:"1"
        }
      ]
      },
      {
        label:"Télefono",
        type:"number",
        formcontrolname: "telephone", 
      },
      {
        label:"Correo electrónico",
        type:"email",
        formcontrolname: "email", 
      },
      {
        label:"Estado Civil",
        type:"select",
        formcontrolname: "civilstatus", 
        url:"civilstatus/selectIndex"
      },
      {
        label:"Numero de Hijos",
        type:"number",
        formcontrolname: "numberchildrens", 
      },
      {
        label:"Numero de Hijas",
        type:"number",
        formcontrolname: "numberdaughters", 
      },
      {
        label:"Esta embarazada",
        type:"radio",
        formcontrolname: "pregnant",
        radiobutton:[{
          text:"Si",
          value:"0"
        },
        {
          text:"No",
          value:"1"
        }
      ]
      },
      {
        label:"Estado de nacimiento",
        type:"select",
        formcontrolname: "statebirth", 
        url:"civilstatus/selectIndex"

      },
    ]
  }
  CreateUserProfile(){
    this.userProfille = [
      {
      label:"Actividades que realiza",
      type:"select",
      formcontrolname: "activities", 
      url:"activity/selectIndex"
     },
     {
      label:"Fuentes de ingresos",
      type:"radio",
      formcontrolname: "sourceofincome",
      radiobutton:[{
        text:"Si",
        value:"0"
      },
      {
        text:"No",
        value:"1"
      }
    ]
    },
    {
      label:"Lugar de trabajo",
      type:"select",
      formcontrolname: "workplace", 
      url:"workplace/selectIndex"
    },
    {
      label:"Horario",
      type:"time",
      formcontrolname: "time", 
    },
    {
      label:"Servicio Médico",
      type:"select",
      formcontrolname: "workplace", 
      url:"medicalservice/selectIndex"
    },
    {
      label:"Formación Educativa",
      type:"select",
      formcontrolname: "training", 
      url:"training/selectIndex"
    },
    {
      label:"Concluida",
      type:"radio",
      formcontrolname: "finish",
      radiobutton:[{
        text:"Si",
        value:"0"
      },
      {
        text:"No",
        value:"1"
      }
    ]
    },
    {
      label:"¿Desea encontrar trabajo?",
      type:"radio",
      formcontrolname: "wantofindwork",
      radiobutton:[{
        text:"Si",
        value:"0"
      },
      {
        text:"No",
        value:"1"
      }
    ]
    },
    {
      label:"¿Desea Capacitarse?",
      type:"radio",
      formcontrolname: "wanttotrain",
      radiobutton:[{
        text:"Si",
        value:"0"
      },
      {
        text:"No",
        value:"1"
      }
    ]
    },
    {
      label:"¿Desea seguir con sus estudios?",
      type:"radio",
      formcontrolname: "wantocontinuestudying",
      radiobutton:[{
        text:"Si",
        value:"0"
      },
      {
        text:"No",
        value:"1"
      }
    ]
    },
    {
      label:"Vivienda",
      type:"select",
      formcontrolname: "households", 
      url:"households/selectIndex"
    },
    {
      label:"Adicciones",
      type:"select",
      formcontrolname: "addictions", 
      url:"addictions/selectIndex"
    },
    {
      label:"¿Desea Agregar caso de violencia?",
      type:"radio",
      formcontrolname: "caseviolence",
      radiobutton:[{
        text:"Si",
        value:"0"
      },
      {
        text:"No",
        value:"1"
      }
    ]
    },
    {
      label:"Enfermedades o dificultades de salud",
      type:"checkboxdescription",
      formcontrolname: "diseases", 
      url:"diseas/selectIndex",
      description:"Origen",
      urloadata:"origin/selectIndex",
    },
    {
      label:"Discapacidad",
      type:"checkboxdescription",
      formcontrolname: "disabilities", 
      url:"disabilities/selectIndex",
      description:"Origen",
      urloadata:"origin/selectIndex",
     
    },
  
  ]
  
  }
  CreateViolenceCase(){
    this.violenceCase=[
      {
        label:"Tipo de violencia",
        type:"select",
        formcontrolname:"typeviolence",
        url:"typesviolences/selectIndex"
      },
      {
        label:"Ambito de violencia",
        type:"select",
        formcontrolname:"fieldviolence",
        url:"fieldviolence/selectIndex"
      },
      {
        label:"Efectos de violencia",
        formcontrolname:"effectviolence",
      },
      {
        label:"Naración de hechos",
        formcontrolname:"narrationfacts",
      },
      {
        label:"Fecha de hechos",
        type:"date",
        formcontrolname:"datefacts",
      },
      {
        label:"Lugar",
        formcontrolname:"location",
      },
      {
        label:"El agresor estaba bajo los efectos de la droga o alcohol",
        type:"select",
        formcontrolname:"addiction",
        url:"addictions/selectIndex"
      },
      {
       label:"¿Uso Armas?",
      type:"radio",
      formcontrolname: "weapons",
      radiobutton:[{
        text:"Si",
        value:"0"
      },
      {
        text:"No",
        value:"1"
      }
    ]
    },
    ]
  }
  CreateProfileAggresor(){
    this.profileAggressor =[
        {
          label:"nombre",
          formcontrolname: "name",
        },
        {
          label:"Apellido Paterno",
          formcontrolname: "lastname",
        },
        {
          label:"Apellido Materno",
          formcontrolname: "motherslastname",
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
          label:"Genero",
          type:"select",
          formcontrolname: "gender", 
          url:"genders/selectIndex"
        },
        {
          label:"Fecha de nacimiento",
          type:"date",
          formcontrolname: "birthdate", 
        },
        {
          label:"Edad",
          type:"number",
          formcontrolname: "age", 
        },
        {
          label:"Calle",
          formcontrolname: "street", 
        },
        {
          label:"Numero",
          type:"number",
          formcontrolname: "numberstreet", 
        },
        {
          label:"Cp",
          type:"number",
          formcontrolname: "cp", 
        },
        {
          label:"Colonia",
          formcontrolname: "colonie", 
          value:"",
          disabled: true
        },
        {
          label:"Municipio",
          formcontrolname: "municipy", 
          value:"",
          disabled: true
        },
        {
          label:"Estado",
          formcontrolname: "state", 
          value:"",
          disabled: true
        },
        {
          label:"Zona de pertenencia",
          type:"radio",
          formcontrolname: "zonepertenence",
          radiobutton:[{
            text:"Urbana",
            value:"0"
          },
          {
            text:"Rural",
            value:"1"
          }
        ]
        },
        {
        label:"Télefono",
        type:"number",
        formcontrolname: "telephone", 
        },
        {
            label:"Actividades que realiza",
            type:"select",
            formcontrolname: "activities", 
            url:"activity/selectIndex"
           },
           {
            label:"Fuentes de ingresos",
            type:"radio",
            formcontrolname: "sourceofincome",
            radiobutton:[{
              text:"Si",
              value:"0"
            },
            {
              text:"No",
              value:"1"
            }
          ]
          },
          {
            label:"Lugar de trabajo",
            type:"select",
            formcontrolname: "workplace", 
            url:"workplace/selectIndex"
          },
          {
            label:"Horario",
            type:"time",
            formcontrolname: "time", 
          },
          {
              label:"Servicio Médico",
              type:"select",
              formcontrolname: "workplace", 
              url:"medicalservice/selectIndex"
          },
          {
              label:"Vivienda",
              type:"select",
              formcontrolname: "households", 
              url:"households/selectIndex"
           },
           {
            label:"Adicciones",
            type:"select",
            formcontrolname: "addictions", 
            url:"addictions/selectIndex"
          },
           {
              label:"Enfermedades o dificultades de salud",
              type:"checkboxdescription",
              formcontrolname: "training", 
              url:"diseas/selectIndex",
              description:"Origen",
              urloadata:"origin/selectIndex",
            },
            {
              label:"Discapacidad",
              type:"checkboxdescription",
              formcontrolname: "training", 
              url:"disabilities/selectIndex",
              description:"Origen",
              urloadata:"origin/selectIndex",
             
            },
          
    ]
  }
  CreateServices(){
    this.services = [
      {
        label:"Lugar de trabajo",
        type:"select",
        formcontrolname: "servicereference", 
        url:"services/selectIndex"
      },
      {
        label:"Sub servicio",
        formcontrolname: "subservice", 
      },
      {
        label:"Eje",
        type:"select",
        formcontrolname: "axis", 
        url:"axis/selectIndex",
        event:"click"
      },
      {
        label:"Programa",
        type:"select",
        formcontrolname: "axisprogram", 
        urloadata:"axisprogram",
        formcontrolnameload:"axis"
        
      },
      {
        label:"Linea de acción",
        formcontrolname: "axis", 
      },
      {
        label:"Observaciónes",
        formcontrolname: "axis", 
      },
      {
        label:"Status",
        type:"select",
        formcontrolname: "status", 
        url:"status/selectIndex"
      },
    ]
  }
}
