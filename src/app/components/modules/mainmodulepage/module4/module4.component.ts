import { Component } from '@angular/core';
import { Inputs } from '../../interfaces/inputs.interface';
import { ModulesService } from '../../services/modules.service';
import { SelectIndex } from '../../interfaces/selects.iterface';
import { event } from 'jquery';
import Swal from 'sweetalert2';
import { PdfComponent } from '../../pdf/pdf.component';
import { MatDialog } from '@angular/material/dialog';
import { PdfsInterface } from '../../interfaces/pdfs.interface';

@Component({
  selector: 'app-module4',
  templateUrl: './module4.component.html',
  styleUrls: ['./module4.component.scss']
})
export class Module4Component {
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
  id:number
  infoData:any
  expendent:Inputs[]
  module1:any
  module4:any
  isPdf:boolean
  isDelete:boolean
  isSave:boolean
  disabled:boolean
  dataPdf:PdfsInterface ={
    title: '',
    dataInfo: []
  } 
  btnmodules1:SelectIndex[] = [
    {
      text:"Seleccionar",
      value:"100"
    }
  ]
  btnmodules4:SelectIndex[] = [
    {
      text:"Editar Expediente de usuaria psicologia imm ",
      value:"100"
    }
  ]
  constructor(public ServiceModule4:ModulesService<any>,public dialog: MatDialog){
    this.disabled = true
    this.allExpendets()
    this.allUsers()
    this.infoUser()
    this.createExpendent()
  }

  infoUser(id?){
    if (!id) {
      this.disabled = false
      return
    }
    this.ServiceModule4.data(`usereport2/${id}`).subscribe({
      next:(n)=>{
          const user = n["data"]["result"][0]
          let colonie = null
          this.ServiceModule4.OtherRoute(`https://api.gomezpalacio.gob.mx/api/cp/colonia/${user["colonies_id"]}`).subscribe({
            next:(n)=>{
              colonie = n["data"]["result"]["Colonia"]
            },
            complete:()=>{
              this.createExpendent(user["Folio_id"],user["Folio"],`${user["Nombre"]} ${user["`Apellido Paterno`"]} ${user["`Apellido Materno`"]}`,user["Edad"],
              user["`Calle`"],user["`Numero`"],colonie,user["Telefono"],
              )
              this.disabled = true
              
            }

          })


        
      },
      error:(e)=>{
        this.disabled = true
      },
      complete:()=>{

      }
    })
  }

  createExpendent(id?,expendent?,name?,age?,street?,number?,colonie?,telephone?){
    this.expendent = [
      {
        label:"id",
        formcontrolname:"procceding_id",
        type:"hidden",
        value:id??id
      },
      {
        label: "Expediente",
        formcontrolname: "procceding",
        disabled: true,
        value:expendent??expendent

      },
      {
        label:"Fecha",
        formcontrolname:"date",
        type:'date',
             
      },
      {
        label:"Psicologia responsable",
        formcontrolname:"psicology",
        width:2
      },
      {
        label: "Status del caso",
        type: "radio",
        formcontrolname: "status_case",
        radiobutton: [{
          text: "Activo",
          value: "1"
        },
        {
          text: "Inactivo",
          value: "0"
        }
        ]
      },
      {
        label: "Nombre",
        formcontrolname: "name",
        value:name??name,
        disabled: true,
        width:5
      },
      {
        label: "Edad",
        type: "number",
        formcontrolname: "age",
        value:age??age,
        disabled: true,

      },
      {
        label: "calle",
        formcontrolname: "street",
        value:street??street,
        disabled: true,
        width:2

      },
      {
        label: "Numero",
        formcontrolname: "number",
        type:"number",
        value:number??number,
        disabled: true,


      },
      {
        label: "Colonia/Ejido",
        formcontrolname: "colonie",
        value:colonie??colonie,
        disabled: true,


      },
      {
        label:"Telefono",
        formcontrolname:"telephone",
        type:'phone',
        value:telephone??telephone,
        disabled: true,
        width:2

      },
      {
        label:"Problematica abordada",
        formcontrolname:"problems_id",
        width:2,
        type:'select',
        url:"expedentproblem"
      },
      {
        label:"Tipo de violencia",
        formcontrolname:"type_violences_id",
        width:2,
        type:'select',
        url:"expendentviolence"
      },
      {
        label:"Sesión 1",
        formcontrolname:"date1",
        secondcontrolname:"came1",
        treeformcontrolname:"comment1",
        type:"session"
      },
      {
        label:"Sesión 2",
        formcontrolname:"date2",
        secondcontrolname:"came2",
        treeformcontrolname:"comment2",
        type:"session"
      },
      {
        label:"Sesión 3",
        formcontrolname:"date3",
        secondcontrolname:"came3",
        treeformcontrolname:"comment3",
        type:"session"
      },
      {
        label:"Sesión 4",
        formcontrolname:"date4",
        secondcontrolname:"came4",
        treeformcontrolname:"comment4",
        type:"session"
      },
      {
        label:"Sesión 5",
        formcontrolname:"date5",
        secondcontrolname:"came5",
        treeformcontrolname:"comment5",
        type:"session"
      },
      {
        label:"Sesión 6",
        formcontrolname:"date6",
        secondcontrolname:"came6",
        treeformcontrolname:"comment6",
        type:"session"
      },
      {
        label:"Sesión 7",
        formcontrolname:"date7",
        secondcontrolname:"came7",
        treeformcontrolname:"comment7",
        type:"session"
      },
      {
        label:"Sesión 8",
        formcontrolname:"date8",
        secondcontrolname:"came8",
        treeformcontrolname:"comment8",
        type:"session"
      },
      {
        label:"Sesión 9",
        formcontrolname:"date9",
        secondcontrolname:"came9",
        treeformcontrolname:"comment9",
        type:"session"
      },
      {
        label:"Sesión 10",
        formcontrolname:"date10",
        secondcontrolname:"came10",
        treeformcontrolname:"comment10",
        type:"session"
      },
      {
        label:"Sesión 11",
        formcontrolname:"date11",
        secondcontrolname:"came11",
        treeformcontrolname:"comment11",
        type:"session"
      },
      {
        label:"Sesión 12",
        formcontrolname:"date12",
        secondcontrolname:"came12",
        treeformcontrolname:"comment12",
        type:"session"
      },
      {
        label:"Sesión 13",
        formcontrolname:"date13",
        secondcontrolname:"came13",
        treeformcontrolname:"comment13",
        type:"session"
      },
      {
        label:"Sesión 14",
        formcontrolname:"date14",
        secondcontrolname:"came14",
        treeformcontrolname:"comment14",
        type:"session"
      },
      {
        label:"Sesión 15",
        formcontrolname:"date15",
        secondcontrolname:"came15",
        treeformcontrolname:"comment15",
        type:"session"
      },
      {
        label:"Sesión 16",
        formcontrolname:"date16",
        secondcontrolname:"came16",
        treeformcontrolname:"comment16",
        type:"session"
      },
      {
        label:"Sesión 17",
        formcontrolname:"date17",
        secondcontrolname:"came17",
        treeformcontrolname:"comment17",
        type:"session"
      },
      {
        label:"Sesión 18",
        formcontrolname:"date18",
        secondcontrolname:"came18",
        treeformcontrolname:"comment18",
        type:"session"
      },
      {
        label:"Diagnostico de cierre",
        formcontrolname:"diagnostic",
        optional:true,
        width:2
      },
      {
        label:"Motivo de cierre",
        formcontrolname:"motive_closed_id",
        optional:true,
      width:2,
      type:'select',
        url:"expendentclose"
      },
      {
        label:"Fecha de cierre",
        formcontrolname:"dateclosed",
        optional:true,
        type:"date",
        width:2
      },

    ]
  }
  allUsers() {
    this.ServiceModule4.data("users2").subscribe({
      next: (n) => {
        this.module1 = n["data"]["result"]
      }
    })
  }
  allExpendets(){
    this.ServiceModule4.data("expendents").subscribe({
      next: (n) => {

        this.module4 = n["data"]["result"]
      },
    
    })
  }

  ButtonEventsModule1(event){
    const id = event[0]
    this.infoUser(id)

  }
  ButtonEventsModule4(event){
    const id = event[0]
    this.id = id
    this.ServiceModule4.data(`expendent/${id}`).subscribe({
      next:(n)=>{
        this.infoData = n["data"]["result"]
      },
      complete:()=>{
        this.disabled =true
      }
    })
  }
  Delete(event){
    this.isDelete = true
    this.ServiceModule4.Delete(`expendent/${event}`).subscribe({
      next:(n)=>{
        this.Toast.fire({
          position: 'top-end',
          icon: 'success',
          title: `Se ha eliminado el expediente`,
        })
        this.restartForm()
        this.isDelete = false

      },
      error:(e)=>{
        this.Toast.fire({
          position: 'top-end',
          icon: 'success',
          title: `No se a podido eliminar el expediente`,
        })
        this.isDelete = false

      }
    })
  }
  Submit(event){
    this.isSave = true
    let route = `expendent`
    let msj = `insertado`
    if (this.id) {
        route =`expendentupdate/${this.id}`
        msj = "actualizado"
      
    }
    this.ServiceModule4.Post(route,event).subscribe({
      next:(n)=>{
        this.isSave = false
        this.Toast.fire({
          position: 'top-end',
          icon: 'success',
          title: `Se ha ${msj} el expediente`,
        })
      },
      error:(e)=>{
        this.isSave = false
        this.Toast.fire({
          position: 'top-end',
          icon: 'error',
          title: `No se pudo ${msj} el expediente`,
        })
        
      },
      complete:()=>{
          this.restartForm()
      }
    })
  }
  restartForm(){
    this.disabled = false
    this.expendent =[]
    this.allUsers();
    this.allExpendets()
    this.createExpendent()
  }
  GeneratePdf(event: number) {
    this.isPdf = true
    this.ServiceModule4.data(`expendentpdf/${event}`).subscribe({
      next: (n) => {
        const userData = n["data"]["result"][0]; 
        
        // Datos del reporte obtenidos de la respuesta HTTP
        this.dataPdf.title = `Reporte de ${userData["Nombre"]}`;
       

        this.dataPdf.dataInfo = [
          {
            subtitule: "1 Expediente de usuarias psicologicas del IMM",
            table: [],
            sessions:[]

          },
          
        ];
        let id = 0
        for (let key in userData) {
          if (userData.hasOwnProperty(key)) {
            const value = userData[key];
            let cleanedKey = key.replace(/`/g, '');
            
            let exist = 0
            let keyIf = key
          
             cleanedKey = cleanedKey.replace(/\d/g, '');

            this.dataPdf.dataInfo[id].table.push({
              text: cleanedKey,
              value: value
            });
          }
        }
        this.isPdf = false

        this.ServiceModule4.setData(this.dataPdf)
        const dialogRef = this.dialog.open(PdfComponent, {
          width: '60%',
          maxHeight:'600px'
        });

        dialogRef.afterClosed().subscribe(result => {
        });
      },
      error:(e)=>{
        this.isPdf = false

      }
    });
  }
}
