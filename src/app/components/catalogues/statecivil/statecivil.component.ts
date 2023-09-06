import { Component, ViewChild } from '@angular/core';
import { CivilState } from './apiservice/civilstate.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CivilStateService } from './apiservice/civilstate.service';

@Component({
  selector: 'app-statecivil',
  templateUrl: './statecivil.component.html',
  styleUrls: ['./statecivil.component.scss']
})
export class StatecivilComponent {
  public civil: string = '';
  public updatecivilstatus: CivilState;
  public action: Boolean = true;
  public id: number;
  StatusCivil: FormGroup;
  formsend: Boolean = false;
  displayedColumns: string[] = ['civil_status', 'Actions'];
  dataSource: MatTableDataSource<CivilState>;
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
  constructor(public CivilStateService: CivilStateService) {
    // Create 100 users


    // Assign the data to the data source for the table to render
    this.reloaData();
  }

  reloaData() {
    
        this.isLoading = true
        this.CivilStateService.dataCivilState().subscribe({
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
    this.StatusCivil = new FormGroup(
      {
        civil_status: new FormControl('', [Validators.required])
      }
    )
  }
  deleteStatusCivil(id: number): void {
    this.isLoading = true

    this.CivilStateService.deleteCivilState(id).subscribe({
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
  updateStatusCivil(gender: string, id: number): void {
    
    this.action = false;
    this.civil = gender;
    this.id = id;

  }
  ngOnInit(): void {
    this.creategender()
  }
  onsubmit() {
    this.isLoading = true

    if (this.action) {
      
      this.CivilStateService.NewCivilState(this.StatusCivil.value).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha registrado el estado civil ${this.StatusCivil.value.civil_status}`,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar registrar`,
          })
         
        }
      });
    }
    else {
      this.updatecivilstatus = {
        id: this.id,
        civil_status: this.civil,
        active: true,
      }
      this.CivilStateService.updateCivilState(this.updatecivilstatus).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha actualizado el estado civil `,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar actualizar el estado civil `,
          })
       
        }

      });

    }
    this.civil = '';
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