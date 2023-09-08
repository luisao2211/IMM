import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServicesReference } from './apiservice/servicesrefence.interface';
import { ServicesReferenceService } from './apiservice/servicesreference.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-servicesreference',
  templateUrl: './servicesreference.component.html',
  styleUrls: ['./servicesreference.component.scss']
})
export class ServicesreferenceComponent {
  public serv: string = '';
  public updateservice: ServicesReference;
  public action: Boolean = true;
  public id: number;
  services: FormGroup;
  formsend: Boolean = false;
  displayedColumns: string[] = ['service', 'Actions'];
  dataSource: MatTableDataSource<ServicesReference>;
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
  constructor(public ServicesReferenceService: ServicesReferenceService) {
    // Create 100 users


    // Assign the data to the data source for the table to render
    this.reloaData();
  }

  reloaData() {
    
        this.isLoading = true
        this.ServicesReferenceService.dataService().subscribe({
      next:  (res) => {

        this.dataSource =  new MatTableDataSource(res['data']['result']);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false
      },
      error: (e)=>{
        this.isLoading = false

      },
      complete() {
        
        
      }

    });
  }

  createService() {
    this.services = new FormGroup(
      {
        service: new FormControl('', [Validators.required])
      }
    )
  }
  deleteService(id: number): void {
    this.isLoading = true

    this.ServicesReferenceService.deleteService(id).subscribe({
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
  updateService(services: string, id: number): void {
    
    this.action = false;
    this.serv = services;
    this.id = id;

  }
  ngOnInit(): void {
    this.createService()
  }
  onsubmit() {
    this.isLoading = true

    if (this.action) {
      
      this.ServicesReferenceService.NewService(this.services.value).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha registrado bajo los servicios de referencia`,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar registrar bajo los servicios de referencia`,
          })
          this.isLoading = false

        }
      });
    }
    else {
      this.updateservice = {
        id: this.id,
        service: this.serv,
        active: true,
      }
      this.ServicesReferenceService.updateService(this.updateservice).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha actualizado bajo los servicios de referencia `,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar actualizar bajo los servicios de referencia`,
          })
          this.isLoading = false

        }

      });

    }
    this.serv = '';
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

