import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AxisPrograms } from './apiservice/axisprograms.interface';
import { AxisProgramsService } from './apiservice/axisprograms.service';
import { AxisService } from '../axis/apiservice/axis.service';
import { Axis } from './apiservice/axis.interface';
import { error } from 'jquery';
@Component({
  selector: 'app-axisprograms',
  templateUrl: './axisprograms.component.html',
  styleUrls: ['./axisprograms.component.scss']
})
export class AxisprogramsComponent {
  public axis: Axis[]=[]
  public axiSelected: string= ''
  public axisprogram: string = '';
  public updateaxisprogram: AxisPrograms;
  public action: Boolean = true;
  public id: number;
  axisprograms: FormGroup;
  formsend: Boolean = false;
  displayedColumns: string[] = ['axisprogram','axi', 'Actions'];
  dataSource: MatTableDataSource<AxisPrograms>;
  public isLoading = true;
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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public AxisProgramsService: AxisProgramsService, public AxisService:AxisService) {
    // Create 100 users
    

    // Assign the data to the data source for the table to render
    this.reloaData();
  }
 

  reloaData() {
    
        this.isLoading = true
        this.AxisProgramsService.dataAxisProgram().subscribe({
      next:  (res) => {

        this.dataSource =  new MatTableDataSource(res['data']['result']);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false
      },
      error: console.log,
      complete() {
        
        
      }

    });
  }

  createAxisProgram() {
    this.axisprograms = new FormGroup(
      {
        id_axi: new FormControl('', [Validators.required]),
        axisprogram: new FormControl('', [Validators.required])
      }
    )
  }
  deleteAxisProgram(id: number): void {
    this.isLoading = true

    this.AxisProgramsService.deleteAxisProgram(id).subscribe({
      next: (res) => {
        this.reloaData();
       
        this.Toast.fire({
          position: 'top-end',
          icon: 'success',
          title: `Se ha eliminado correctamente`,
        })
        this.isLoading = false

      },
      error: (e) => {
        this.Toast.fire({
          position: 'top-end',
          icon: 'error',
          title: `Se ha producido un error`,
        })
      },

    })

  }
  updateAxisProgram(axisprograms: string, id: number): void {
     this.axiSelected= axisprograms['id_axi']
    this.action = false;
    this.axisprogram = axisprograms['axisprogram'];

  }
  

  ngOnInit(): void {
    this.AxisService.SelectedIndex().subscribe({
      next:(n)=>{
          this.axis = n["data"]["result"]
      },
      error:(e)=>{

      }
    })
    this.createAxisProgram()
  }
  onsubmit() {
    this.isLoading = true

    if (this.action) {
      this.AxisProgramsService.NewAxisProgram(this.axisprograms.value).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha registrado el programa del eje`,
          })
         
          this.isLoading = false
          this.axiSelected = ''

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar registrar el programa del eje`,
          })
         
        }
      });
    }
    else {
      this.updateaxisprogram = {
        id: this.id,
        id_axi:parseInt(this.axiSelected),
        axisprogram: this.axisprogram,
        active: true,
      }
      this.AxisProgramsService.updateAxisProgram(this.updateaxisprogram).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha actualizado el programa del eje `,
          })
         
          this.isLoading = false
          this.axiSelected = ''
        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar actualizar el programa del eje`,
          })
       
        }

      });

    }
    this.axisprogram = '';
    this.action = true;
  }







  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
