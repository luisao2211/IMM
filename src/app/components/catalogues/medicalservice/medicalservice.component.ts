import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MedicalService } from './apiservice/medicalservices.interface';
import { MedicalServiceService } from './apiservice/medicalservices.service';

@Component({
  selector: 'app-medicalservice',
  templateUrl: './medicalservice.component.html',
  styleUrls: ['./medicalservice.component.scss']
})
export class MedicalserviceComponent {
  public service: string = '';
  public updateMedicalservice: MedicalService;
  public action: Boolean = true;
  public id: number;
  medicalServices: FormGroup;
  formsend: Boolean = false;
  displayedColumns: string[] = ['medicalservice', 'Actions'];
  dataSource: MatTableDataSource<MedicalService>;
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
  constructor(public MedicalServiceService: MedicalServiceService) {
    // Create 100 users


    // Assign the data to the data source for the table to render
    this.reloaData();
  }

  reloaData() {
    
        this.isLoading = true
        this.MedicalServiceService.dataWorkPlace().subscribe({
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

  creategender() {
    this.medicalServices = new FormGroup(
      {
        medicalservice: new FormControl('', [Validators.required])
      }
    )
  }
  deleteMedicalService(id: number): void {
    this.isLoading = true

    this.MedicalServiceService.deleteWorkPlace(id).subscribe({
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
        this.isLoading = false

      },

    })

  }
  updateMedicalService(medicalServices: string, id: number): void {
    
    this.action = false;
    this.service = medicalServices;
    this.id = id;

  }
  ngOnInit(): void {
    this.creategender()
  }
  onsubmit() {
    this.isLoading = true

    if (this.action) {
      
      this.MedicalServiceService.NeWorkPlace(this.medicalServices.value).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha registrado el servicio médico`,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar registrar servicio médico`,
          })
          this.isLoading = false

        }
      });
    }
    else {
      this.updateMedicalservice = {
        id: this.id,
        medicalservice: this.service,
        active: true,
      }
      this.MedicalServiceService.updateWorkPlace(this.updateMedicalservice).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha actualizado  el servicio médico `,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar actualizar el servicio médico `,
          })
          this.isLoading = false

        }

      });

    }
    this.service = '';
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
