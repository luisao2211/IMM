import { Component, ViewChild } from '@angular/core';
import { Inputs,Crud } from '../../interfaces/inputs.interface';
import { MatStepper } from '@angular/material/stepper';
import { ModulesService } from '../../services/modules.service';
import Swal from 'sweetalert2';
import { from, concatMap, finalize, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: 'app-module1',
  templateUrl: './module1.component.html',
  styleUrls: ['./module1.component.scss']
})
export class Module1Component {
  id:number
  stepperDestroy:Boolean
  data: any
  infoForm:any
  infoData:any
  contNewForm: number = 0
  generalData:Inputs[]
  userProfille:Inputs[]
  violenceCase:Inputs[]
  profileAggressor:Inputs[]
  services:Inputs[]
  advertice:string
  urls = []
  @ViewChild(MatStepper) stepper: MatStepper;
  isLinear = true;
  valuesFormControlNames = []
  methods = [
    this.CreateGeneralData.bind(this),
    this.CreateUserProfile.bind(this),
    this.CreateViolenceCase.bind(this),
    this.CreateProfileAggresor.bind(this),
    this.CreateServices.bind(this),
  ];
  loadInfoUrls = [
    // "",
   "userprofile",
   "userviolence",
   "profileagressor",
   "userservice"
  ]
  clearForm =[
    false,
    false,
    false,
    false,
    false,
  ]
  noupdatedata =[
    false,
    false,
    false,
    false,
    false,
  ]
  public isLoading = false;

  contLoadInfo:number = 0
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
  NextStepper(event:boolean) {
     
  this.contLoadInfo = this.stepper.selectedIndex 
  this.contNewForm = this.stepper.selectedIndex +1

    if (this.id >0 && this.noupdatedata[this.contLoadInfo]!==true) {
      console.error(this.stepper.selectedIndex , this.contLoadInfo)
      this.ServiceModule1.data(`${this.loadInfoUrls[this.contLoadInfo]}/${this.id}`).subscribe({
        next:(n)=>{
          if (this.stepper.selectedIndex == 0) 
               this.infoData = n["data"]["result"]
               this.infoForm = n["data"]["result"]
               this.noupdatedata[this.contLoadInfo] = true
          console.log(this.infoForm)
        }
      })
    
  }
    if (this.contNewForm < this.methods.length  && this.noupdatedata[this.contLoadInfo]!==true) {
        if (this.contNewForm >this.stepper.selectedIndex) {
            this.contNewForm = this.stepper.selectedIndex +1
        }
        if (this.contNewForm<0) {
          this.contNewForm = 0
        }
        if(this.noupdatedata[this.contLoadInfo]!==true) {
          this.noupdatedata[this.contLoadInfo] = true

          this.methods[this.contNewForm]();
        }
        this.contNewForm ++

      }

    if (this.stepper.selectedIndex === this.stepper.steps.length - 1) {
        this.NewProfileUser()
    }
    this.stepper.next();

  }
  AfterStepper(){
   
  console.warn(this.urls)
    if (this.stepperDestroy) {
        this.stepper.previous();
        this.stepper.previous();
        this.contNewForm = this.stepper.selectedIndex +1
        this.contLoadInfo = this.stepper.selectedIndex +1
       
    }
    this.valuesFormControlNames.splice(this.stepper.selectedIndex - 1, 1);
    console.warn( "ELIMINAR",this.valuesFormControlNames,this.urls);   
    this.contNewForm = this.stepper.selectedIndex +1
        this.contLoadInfo = this.stepper.selectedIndex +1
    this.urls.pop()
    this.stepper.previous()
    // this.contNewForm = this.stepper.selectedIndex.length-1
    // this.contLoadInfo = this.stepper.steps.length -2
  }


  constructor(private ServiceModule1:ModulesService<any>) {
    this.allUsers();
    this.startCreateForm();

  }
  startCreateForm(){
 
    this.urls = []
    this.contLoadInfo= 1;
    this.contNewForm = 0;
    this.id = 0;
    this.ServiceModule1.data("proceding").subscribe({
      next:(n)=>{
        this.stepper.reset()
        this.methods[this.contNewForm](n["data"]["result"]);
        this.contNewForm ++
        for (let i = 0; i < this.clearForm.length; i++) {
          this.clearForm[i] = false;
          this.noupdatedata[i] = false
    
        }
      }
    })
  }

  ngAfterViewInit() {
    const stepHeaders = document.querySelectorAll('.mat-step-header');
    stepHeaders.forEach((header: HTMLElement) => {
      header.style.pointerEvents = 'none';
    });
  }
  CreateGeneralData(id){
    this.advertice = `El Estado, Municipio y Colonia se cargaran automaticamente despues de ingresar el Codigo postal solamente tu seleccionas la colonia
    que coinciden con el mismo codigo postal
    `
    this.generalData = [
      {
      label:"Expediente",
      formcontrolname: "procceding",
      value:`${id +1}`,
      disabled:true
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
        formcontrolname: "lastName",
      },
      {
        label:"Apellido Materno",
        formcontrolname: "secondName",
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
        formcontrolname: "gender_id",
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
        formcontrolname: "number",
      },
      {
        label:"Cp",
        type:"cp",
        formcontrolcp:"cp",
        formcontrolname: "colonies_id",
        formcontrolmunicipy:"municipy",
        formcontrolstate:"state"
      },
      {
        label:"Zona de pertenencia",
        type:"radio",
        formcontrolname: "zone",
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
        type:"phone",
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
        formcontrolname: "civil_status_id",
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
        otherurl:"https://api.gomezpalacio.gob.mx/api/estados"

      },
    ]
  }
  CreateUserProfile(){

    this.userProfille = [
      {
      label:"Actividades que realiza",
      type:"select",
      formcontrolname: "activity_id",
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
      formcontrolname: "workplace_id",
      url:"workplace/selectIndex"
    },
    {
      label:"Horario",
      type:"time",
      formcontrolname: "time",
    },
    {
      label:"Formación Educativa",
      type:"select",
      formcontrolname: "training_id",
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
      formcontrolname: "household_id",
      url:"households/selectIndex"
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
    label:"Servicio Médico",
    type:"checkbox",
    formcontrolname: "medicalservice_id",
    url:"medicalservice/selectIndex"
  },
  {
    label:"Adicciones",
    type:"checkbox",
    formcontrolname: "addiction_id",
    url:"addictions/selectIndex"
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
      // {
      //   label:"Tipo de violencia",
      //   type:"select",
      //   formcontrolname:"typesviolence_id",
      //   url:"typesviolences/selectIndex"
      // },
      // {
      //   label:"Ambito de violencia",
      //   type:"select",
      //   formcontrolname:"fieldsviolence_id",
      //   url:"fieldviolence/selectIndex"
      // },
      
      {
        label:"Efectos de violencia",
        formcontrolname:"lowefecct",
      },
      {
        label:"Naración de hechos",
        formcontrolname:"narrationfacts",
      },
      {
        label:"Fecha de hechos",
        type:"date",
        formcontrolname:"date",
      },
      {
        label:"Lugar",
        formcontrolname:"location",
      },
      {
        label:"El agresor estaba bajo los efectos de la droga o alcohol",
        type:"select",
        formcontrolname:"addiction_id",
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
    {
      label:"Tipo de violencia",
      type:"checkboxdescription",
      formcontrolname:"typesviolences",
      url:"typesviolences/selectIndex",
      description:"Ambito de violencia",
      urloadata:"fieldviolence/selectIndex"
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
        formcontrolname: "lastName",
      },
      {
        label:"Apellido Materno",
        formcontrolname: "secondName",
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
        formcontrolname: "gender_id",
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
        formcontrolname: "number",
      },
      {
        label:"Cp",
        type:"cp",
        formcontrolcp:"cp",
        formcontrolname: "colonies_id",
        formcontrolmunicipy:"municipy",
        formcontrolstate:"state"
      },
      {
        label:"Zona de pertenencia",
        type:"radio",
        formcontrolname: "zone",
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
        type:"phone",
        formcontrolname: "telephone",
         },
         {
          label:"Actividades que realiza",
          type:"select",
          formcontrolname: "activity_id",
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
          formcontrolname: "workplace_id",
          url:"workplace/selectIndex"
        },
        {
          label:"Horario",
          type:"time",
          formcontrolname: "time",
        },
        {
          label:"Vivienda",
          type:"select",
          formcontrolname: "household_id",
          url:"households/selectIndex"
        },
        {
          label:"Servicio Médico",
          type:"checkbox",
          formcontrolname: "medicalservice_id",
          url:"medicalservice/selectIndex"
        },
        {
          label:"Adicciones",
          type:"checkbox",
          formcontrolname: "addiction_id",
          url:"addictions/selectIndex"
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
  CreateServices(){
    this.services = [
      {
        label:"Sub servicio",
        formcontrolname: "subservice",
      },
      {
        label:"Eje",
        type:"doubleselect",
        formcontrolname: "axi_id",
        url:"axis/selectIndex",
        secondlabel:"Programa",
        secondcontrolname:"axi_program_id",
        urloadata:"axisprogram/types",

      },

      {
        label:"Linea de acción",
        formcontrolname: "lineacction",
      },
      {
        label:"Observaciónes",
        formcontrolname: "observations",
      },
      {
        label:"Status",
        type:"select",
        formcontrolname: "status_id",
        url:"status/selectIndex"
      },
      {
        label:"Servicio de refencia",
        type:"checkbox",
        formcontrolname: "workplace_id",
        url:"services/selectIndex"
      },
    ]
  }
  SetFormControlValues(event){
    this.valuesFormControlNames.push(event.value)
    this.contLoadInfo = this.stepper.selectedIndex +1
    if (this.stepper.selectedIndex == 1) {
      this.stepperDestroy=false
      if(event.value["caseviolence"]=="1"){
        this.contNewForm = this.stepper.steps.length-1
        this.stepper.next()
        this.stepper.next()
        this.contLoadInfo = this.stepper.selectedIndex +1
        // console.log("ES",this.contLoadInfo)
        this.methods[this.contNewForm]();
        this.stepperDestroy=true
      }
    }
    console.warn(event.value)


  }
  NewProfileUser() {
     for (let i = 0; i < this.clearForm.length; i++) {
      this.clearForm[i] = true;
    }
    if (this.valuesFormControlNames.length==3) {
      this.urls.push("userdatageneral")
      this.urls.push(`userprofile`)
      this.urls.push(`userservice`)

    }
    if (this.valuesFormControlNames.length==5) {
      this.urls.push("userdatageneral")
      this.urls.push(`userprofile`)
      this.urls.push(`userviolence`)
      this.urls.push(`profileagressor`)
      this.urls.push(`userservice`)

    }
    console.log("MIS URLS",this.urls)

    if (this.urls.length === 0 || this.valuesFormControlNames.length === 0) {
      return;
    }

    console.error(this.valuesFormControlNames)
    const combinedObservables = from(this.valuesFormControlNames).pipe(
      concatMap((params, i) => {
        console.warn(this.id,"idSSS")
        const url = `${this.urls[i]}${this.id > 0 ? '/' + this.id : ''}`;
        return this.ServiceModule1.Post(url, params).pipe(
          catchError((error) => {
            // Manejar errores aquí si es necesario
            switch (this.urls[i]) {

              case "userdatageneral":
                this.ToastAlertDanger("Error al insertar los pasos 1,2,3,4,5")
                this.RestarModule(i)

                return throwError("Error al insertar los datos generales,"); // Stop the observable chain here

              break;
              case `userprofile`:
                this.ToastAlertDanger("Error al insertar los pasos 2,3,4,5")
                this.RestarModule(i)

                return throwError("Error al insertar los datos generales"); // Stop the observable chain here

              break;
              case `userviolence`:
                console.error(params)
                this.ToastAlertDanger("Error al insertar los pasos 3,4,5")
                this.RestarModule(i)

                return throwError("Error al insertar los datos generales"); // Stop the observable chain here


              break;
              case `profileagressor`:
                console.error(params)

                this.ToastAlertDanger("Error al insertar los pasos 4,5")
                this.RestarModule(i)

                return throwError("Error al insertar los datos generales"); // Stop the observable chain here

            
              break;
              case `userservice`:
                console.error(params)
                this.ToastAlertDanger("Error al insertar el paso 5")
                this.RestarModule(i)

                return throwError("Error al insertar los datos generales"); // Stop the observable chain here

                break;
            default:
              break;
          }
            return of(null); // Devolver un observable para continuar con la siguiente solicitud
          }),
          map((response) => {
            if (response && response["data"] && response["data"]["result"]) {
              // Extraer y devolver el ID de la respuesta
              this.id = response["data"]["result"];
           
            }
            if (i === this.valuesFormControlNames.length-1) {
              // Todas las solicitudes se han completado
             
              this.Toast.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se ha insertado correctame los datos del usuario',
              });
              this.RestarModule(i)
            }
            return null; // Si no se pudo extraer el ID
          }),
          finalize(() => {
          })
        );
      })
    );

    // Suscribe al observable combinado
    combinedObservables.subscribe(() => {});

   
  }
  RestarModule(i){
    this.startCreateForm();
    this.allUsers();
    this.valuesFormControlNames = [];
  }


  ToastAlertDanger(msj:string){
    this.Toast.fire({
      position: 'top-end',
      icon: 'warning',
      title: msj + " por favor actualize en esa parte del formulario al usuario",
    });
  }


  allUsers(){
    this.ServiceModule1.data("users").subscribe({
      next:(n)=>{
        this.data = n["data"]["result"]
      }
    })
  }
  Update(id) {
    this.startCreateForm()
    this.ServiceModule1.data(`userdatageneral/${id}`).subscribe({
      next:(n)=>{
        this.infoData = n["data"]["result"]
        this.id = id
        this.stepper.reset()
      }
      
    })

  }
    Delete(id) {
      this.isLoading = true
      this.ServiceModule1.Delete(`users/${id}`).subscribe({
        next:(n)=>{
          this.isLoading = false

          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha eliminado el usuario`,
          })
          this.allUsers()
        },
        error:(e)=>{
          this.isLoading = false

          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `No se ha eliminado el usuario`,
          })
        },

      })
    }
}

