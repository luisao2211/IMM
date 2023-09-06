import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TypeViolence } from './apiservice/typeviolence.interface';
import { TypeViolenceService } from './apiservice/typeviolence.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-typeviolence',
  templateUrl: './typeviolence.component.html',
  styleUrls: ['./typeviolence.component.scss']
})
export class TypeviolenceComponent {
  public vio: string = '';
  public updateTypeviolence: TypeViolence;
  public action: Boolean = true;
  public id: number;
  violence: FormGroup;
  formsend: Boolean = false;
  displayedColumns: string[] = ['violence', 'Actions'];
  dataSource: MatTableDataSource<TypeViolence>;
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
  constructor(public TypeViolenceService: TypeViolenceService) {
    // Create 100 users


    // Assign the data to the data source for the table to render
    this.reloaData();
  }

  reloaData() {
    
        this.isLoading = true
        this.TypeViolenceService.dataTypeViolence().subscribe({
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

  createTypeViolence() {
    this.violence = new FormGroup(
      {
        violence: new FormControl('', [Validators.required])
      }
    )
  }
  deleteTypeViolence(id: number): void {
    this.isLoading = true

    this.TypeViolenceService.deleteTypeViolence(id).subscribe({
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
  updateTypeViolence(violence: string, id: number): void {
    
    this.action = false;
    this.vio = violence;
    this.id = id;

  }
  ngOnInit(): void {
    this.createTypeViolence()
  }
  onsubmit() {
    this.isLoading = true

    if (this.action) {
      
      this.TypeViolenceService.NeTypeViolence(this.violence.value).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha registrado el tipo de violencia`,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar registrar el tipo de violencia`,
          })
         
        }
      });
    }
    else {
      this.updateTypeviolence = {
        id: this.id,
        violence: this.vio,
        active: true,
      }
      this.TypeViolenceService.updateTypeViolence(this.updateTypeviolence).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha actualizado el tipo de violencia `,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar actualizar el tipo de violencia`,
          })
       
        }

      });

    }
    this.vio = '';
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

