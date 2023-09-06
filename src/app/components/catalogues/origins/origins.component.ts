import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Origin } from './apiservice/intefaceorigins';
import { OriginService } from './apiservice/origins.service';

@Component({
  selector: 'app-origins',
  templateUrl: './origins.component.html',
  styleUrls: ['./origins.component.scss']
})
export class OriginsComponent {
  public dis: string = '';
  public updateorigin: Origin;
  public action: Boolean = true;
  public id: number;
  origins: FormGroup;
  formsend: Boolean = false;
  displayedColumns: string[] = ['origin', 'Actions'];
  dataSource: MatTableDataSource<Origin>;
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
  constructor(public OriginService: OriginService) {
    // Create 100 users


    // Assign the data to the data source for the table to render
    this.reloaData();
  }

  reloaData() {
    
        this.isLoading = true
        this.OriginService.dataOrigin().subscribe({
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

  createOrigins() {
    this.origins = new FormGroup(
      {
        origin: new FormControl('', [Validators.required])
      }
    )
  }
  deleteOrigins(id: number): void {
    this.isLoading = true

    this.OriginService.deleteOrigin(id).subscribe({
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
  uptadeOrigin(origins: string, id: number): void {
    
    this.action = false;
    this.dis = origins;
    this.id = id;

  }
  ngOnInit(): void {
    this.createOrigins()
  }
  onsubmit() {
    this.isLoading = true

    if (this.action) {
      this.OriginService.NewOrigin(this.origins.value).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha registrado origen`,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar registrar origen`,
          })
         
        }
      });
    }
    else {
      this.updateorigin = {
        id: this.id,
        origin: this.dis,
        active: true,
      }
      this.OriginService.updateOrigin(this.updateorigin).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha actualizado el origen`,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar actualizar enfermedad o dificultad de salud `,
          })
       
        }

      });

    }
    this.dis = '';
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

