import { Component } from '@angular/core';
import { Inputs } from '../../interfaces/inputs.interface';
import { ModulesService } from '../../services/modules.service';
import Swal from 'sweetalert2';
import { SelectIndex } from '../../interfaces/selects.iterface';
import { PdfsInterface } from '../../interfaces/pdfs.interface';
import { PdfComponent } from '../../pdf/pdf.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-module3',
  templateUrl: './module3.component.html',
  styleUrls: ['./module3.component.scss']
})
export class Module3Component {
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
  dataPdf:PdfsInterface ={
    title: '',
    dataInfo: [],
  }
  idActivity :number
  infoData:any
  activities:Inputs[]
  data:any
  isPdf:boolean
  isDelete:boolean
  isSave:boolean
  tableButtons: SelectIndex[] = [
    {
      text:"Editar Actividades IMM - captura de actividades",
      value:"100"
    }
  ]
  constructor(private ServiceModule3: ModulesService<any>,public dialog: MatDialog){
    this.allActivities()
    this.createActivitys()
  }
  restartForm(){
    this.activities = []
    this.createActivitys()
    this.allActivities()
  }
  allActivities() {
    this.ServiceModule3.data("captureactivities").subscribe({
      next: (n) => {
        this.data = n["data"]["result"]
        console.warn(this.data)
      }
    })
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
        formcontrolname: "activities", 
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
        label: "Eje",
        type: "doubleselect",
        formcontrolname: "axi_id",
        url: "axis/selectIndex",
        secondlabel: "Programa",
        secondcontrolname: "axi_program_id",
        urloadata: "axisprogram/types",
        
      },
      {
        label:"Descripción",
        formcontrolname:"description",
        width:10
      },
      {
        label:"observación",
        formcontrolname: "observations",
        width:10
      },
     
    ]
  }
  Submit(event){
    this.isSave=true
    let url = "captureactivities"
    let msj = "insertado"
    if (this.idActivity!=null) {
        url = `captureactivities/${this.idActivity}`
        msj = "actualizado"
    }
    this.ServiceModule3.Post(url, event).subscribe({
      next:(n)=>{
        this.Toast.fire({
          position: 'top-end',
          icon: 'success',
          title: `Se ha ${msj} la actividad`,
        })
        this.restartForm()

      },
      error:(e)=>{
        this.Toast.fire({
          position: 'top-end',
          icon: 'error',
          title: `No se ha podido  ${msj} la actividad`,
        })
        
        this.restartForm()

      },
      complete :()=>{
        this.idActivity = null
        this.isSave=false


        }
      })
    }
    Delete(event){
      this.isDelete=true

      this.ServiceModule3.Delete(`captureactivities/${event}`).subscribe({
        next:(n)=>{
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha eliminado la actividad`,
          })
         
        },
        error:(e)=>{
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `No se ha podido eliminar la actividad`,
          })
        },
        complete :()=>{
            this.allActivities();
            this.isDelete=false

          }
        })
    }
    ButtonEvents(event){
      const id=event[0]
      this.idActivity = id
      this.ServiceModule3.data(`captureactivities/${id}`).subscribe({
        next:(n)=>{
          this.infoData=[n["data"]["result"]]
         
        },
        error:(e)=>{
         
        },
        complete :()=>{
  
          }
        })
    }
    GeneratePdf(event: number) {
      this.isPdf = true
      this.ServiceModule3.data(`activitiesdata/${event}`).subscribe({
        next: (n) => {
          const userData = n["data"]["result"][0]; 
          
          // Datos del reporte obtenidos de la respuesta HTTP
          this.dataPdf.title = `Reporte de ${userData["Actividad"]}`;
         
  
          this.dataPdf.dataInfo = [
            {
              subtitule: "1 Actividades IMM - captura de actividades",
              table: [],
            },
            
          ];
          let id = 0
          for (let key in userData) {
            if (userData.hasOwnProperty(key)) {
              const value = userData[key];
              let cleanedKey = key.replace(/`/g, '');
              
              let exist = 0
              let keyIf = key
            
             
              this.dataPdf.dataInfo[id].table.push({
                text: cleanedKey,
                value: value
              });
            }
          }
          this.isPdf = false

          this.ServiceModule3.setData(this.dataPdf)
          const dialogRef = this.dialog.open(PdfComponent, {
            width: '60%',
            maxHeight:'600px'
          });

          dialogRef.afterClosed().subscribe(result => {
          });
        },
        error:(e)=>{
          // this.isPdf = false
  
        }
      });
    }
}
