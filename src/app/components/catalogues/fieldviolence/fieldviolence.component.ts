import { FieldViolenceService } from './apiservice/fieldviolence.service';
import { FieldViolence } from './apiservice/fieldviolence.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fieldviolence',
  templateUrl: './fieldviolence.component.html',
  styleUrls: ['./fieldviolence.component.scss']
})
export class FieldviolenceComponent {
  public vio: string = '';
  public updatefieldviolence: FieldViolence;
  public action: Boolean = true;
  public id: number;
  fieldviolence: FormGroup;
  formsend: Boolean = false;
  displayedColumns: string[] = ['fieldviolence', 'Actions'];
  dataSource: MatTableDataSource<FieldViolence>;
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
  constructor(public FieldViolenceService: FieldViolenceService) {
    // Create 100 users


    // Assign the data to the data source for the table to render
    this.reloaData();
  }

  reloaData() {
    
        this.isLoading = true
        this.FieldViolenceService.dataFieldViolence().subscribe({
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

  createFieldViolence() {
    this.fieldviolence = new FormGroup(
      {
        fieldviolence: new FormControl('', [Validators.required])
      }
    )
  }
  deleteFieldViolence(id: number): void {
    this.isLoading = true

    this.FieldViolenceService.deleteFieldViolence(id).subscribe({
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
  updateFieldViolence(fieldviolence: string, id: number): void {
    
    this.action = false;
    this.vio = fieldviolence;
    this.id = id;

  }
  ngOnInit(): void {
    this.createFieldViolence()
  }
  onsubmit() {
    this.isLoading = true

    if (this.action) {
      
      this.FieldViolenceService.NewFieldViolence(this.fieldviolence.value).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha registrado el ambito violencia`,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar registrar el ambito violencia`,
          })
         
        }
      });
    }
    else {
      this.updatefieldviolence = {
        id: this.id,
        fieldviolence: this.vio,
        active: true,
      }
      this.FieldViolenceService.updateFieldViolence(this.updatefieldviolence).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha actualizado el ambito violencia `,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar actualizar el ambito violencia`,
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

