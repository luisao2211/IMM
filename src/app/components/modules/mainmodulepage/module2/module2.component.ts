import { Component,Inject } from '@angular/core';
import { Inputs } from '../../interfaces/inputs.interface';
import { ModulesService } from '../../services/modules.service';
import Swal from 'sweetalert2';
import { SelectIndex } from '../../interfaces/selects.iterface';
import { event } from 'jquery';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PdfsInterface } from '../../interfaces/pdfs.interface';
import { PdfComponent } from '../../pdf/pdf.component';

@Component({
  selector: 'app-module2',
  templateUrl: './module2.component.html',
  styleUrls: ['./module2.component.scss']
})
export class Module2Component {
  comunity:Inputs[]
  isSave :Boolean= false
  isPdf:Boolean= false
  isDelete:Boolean= false
  id:number
  data:any
  infoData:any
  dataPdf:PdfsInterface ={
    title: '',
    dataInfo: []
  }
  tableButtons: SelectIndex[] = [
    {
      text:"Visualizar Banco de memorias",
      value:"1"
    },
    {
      text:"Actualizar Población beneficiada - talleres / pláticas / conferencias / actividades",
      value:"100"
    }
  ]
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
  constructor(private ServiceModule2: ModulesService<any>,public dialog: MatDialog){
    this.allUsers()
    this.createComunnity()
  }
  restartForm(){
    this.comunity = []
    this.createComunnity()
    this.allUsers()
  }
  allUsers() {
    this.ServiceModule2.data("usersmodule2").subscribe({
      next: (n) => {
        this.data = n["data"]["result"]
      }
    })
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
    this.isSave = true
    const files = event.files
  
    
    this.ServiceModule2.Post(`userdatageneral${this.id ? '/' + this.id : ''}`, event).subscribe({
      next:(n)=>{
        this.id = n["data"]["result"];

       
      },
      error:(e)=>{
        this.Toast.fire({
          position: 'top-end',
          icon: 'error',
          title: `No se ha podido insertar`,
        })  
        this.restartForm()
        this.isSave = false

      },
      complete :()=>{
        if (!files.entries().next().done) {
          files.append("id",this.id)
          this.ServiceModule2.Post( "userfiles",files).subscribe({
            next:(n)=>{
              this.Toast.fire({
                position: 'top-end',
                icon: 'success',
                title: `Se ha insertado el reporte`,
              })  
              this.restartForm()
              this.isSave = false

            },
            error:(e)=>{
              this.Toast.fire({
                position: 'top-end',
                icon: 'error',
                title: `No se ha podido insertar las evidencias`,
              })  
              this.restartForm()
              this.isSave = false
            },
            complete :()=>{
              this.id = null
            }
          })
        }
        else{
          this.restartForm()
          this.id = null
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha insertado el reporte`,
          }) 
          this.isSave = false

        }
      }
    })

  }
  ButtonEvents(event){
    const idUser = event[0]
    this.id = idUser
    const idEventButton = event[1]
    const idtaller = event[2]
    let Files:any
    let contenidoHtml = `
    <div class="row">
      <h1 class="text-center">Banco de memorias fotograficas</h1>
    `;
  
  if (idEventButton === "1") {
    this.ServiceModule2.data(`userfiles/${idtaller}`).subscribe({
      next: (n) => {
        Files = n["data"]["result"];
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        if (Files.length > 0) {
          Files.forEach(f => {
  
            contenidoHtml += `
            <div class="col-4">
              <img class="w-75 h-100" src="${f.url}">
            </div>
            `;
          });
  
          contenidoHtml += `
          </div>
          `;
  
          this.dialog.open(HtmlDialogComponent, {
            width: '60%',
            maxHeight: '600px',
            data: { contenidoHtml },
          });
  
          console.error(contenidoHtml);
        }
      }
    });
  } 
  else if(idEventButton =="100"){
    this.ServiceModule2.data(`userworkshop/${idUser}`).subscribe({
      next:(n)=>{
        this.infoData=n["data"]["result"]
      }
    })

  }
  

  
  }    
  GeneratePdf(event: number) {
    this.isPdf = true
    this.ServiceModule2.data(`usereportmodule2/${event}`).subscribe({
      next: (n) => {
        const userData = n["data"]["result"][0]; 
        
        // Datos del reporte obtenidos de la respuesta HTTP
        this.dataPdf.title = `Reporte de ${userData["Nombre"]}`;
       

        this.dataPdf.dataInfo = [
          {
            subtitule: "Población beneficiada - talleres / pláticas / conferencias / actividades",
            table: [],
            img:[]
          },
          
        ];
        let id = 0
        for (let key in userData) {
          if (userData.hasOwnProperty(key)) {
            const value = userData[key];
            let cleanedKey = key.replace(/`/g, '');
            
            let exist = 0
            let keyIf = key
          
            console.warn(cleanedKey)
            if (cleanedKey.includes('imagenes')) {
              const img = value.split(",")
              img.forEach(element => {
                this.dataPdf.dataInfo[id].img.push({
                  url: element,
                });
              });
              continue
            }

            //   const dialogRef = this.dialog.open(PdfComponent, {
            //     width: '60%',
            //     maxHeight:'600px'
            //   });
        
            //   dialogRef.afterClosed().subscribe(result => {
            //   });
            // }
         
            if (cleanedKey == 'colonies_id' ) {
              let idsection = id
              this.ServiceModule2.OtherRoute(`https://api.gomezpalacio.gob.mx/api/cp/colonia/${value}`).subscribe({
                next: (n) => {
                    if (value) {
                      this.dataPdf.dataInfo[idsection].table.push({
                        text: 'Codigo Postal',
                        value: n["data"]["result"]["CodigoPostal"]
                      });
                      this.dataPdf.dataInfo[idsection].table.push({
                        text: 'Municipio',
                        value: n["data"]["result"]["Municipio"]
                      });
                      this.dataPdf.dataInfo[idsection].table.push({
                        text: 'Estado',
                        value: n["data"]["result"]["Estado"]
                      });
                      this.dataPdf.dataInfo[idsection].table.push({
                        text: 'Colonia',
                        value: n["data"]["result"]["Colonia"]
                      });
                    }
                      this.isPdf = false
                    const dialogRef = this.dialog.open(PdfComponent, {
                      width: '60%',
                      maxHeight:'600px'
                    });

                    dialogRef.afterClosed().subscribe(result => {
                    });
                  

                },
               
                
          
              })
            }

         


            
            this.dataPdf.dataInfo[id].table.push({
              text: cleanedKey,
              value: value
            });
          }
        }
        
        this.ServiceModule2.setData(this.dataPdf)
     
      },
      error:(e)=>{
        this.isPdf = false

      }
    });
  }
  Delete(id) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás deshacer esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isDelete =true

        this.ServiceModule2.Delete(`users/${id}`).subscribe({
          next: (n) => {
            this.isDelete = false

            this.Toast.fire({
              position: 'top-end',
              icon: 'success',
              title: `Se ha eliminado el reporte`,
            })
            this.allUsers()
          },
          error: (e) => {
            this.isDelete = false

            this.Toast.fire({
              position: 'top-end',
              icon: 'error',
              title: `No se ha eliminado el reporte`,
            })
          },

        })
      }
    });

  }
}
@Component({
  template: `
  <div class="dialog-container">
    <div class="content" [innerHTML]="data.contenidoHtml"></div>
    <!-- <button type="button" class="btn btn-primary close-button" (click)="closeDialog()">Cerrar</button> -->

  </div>
`,
  styles: [`
.content{
  margin:1em;
}

.close-button {
      position:fixed;
      bottom:0;
      right:0;
      margin:1em;
    }

 
`]
})
export class HtmlDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<HtmlDialogComponent>
  ) { }

  closeDialog() {
    this.dialogRef.close();
  }
}
