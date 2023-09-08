import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MotiveService } from './apiservice/motive.service';
import { Motive } from './apiservice/motive.interface';


@Component({
  selector: 'app-motive',
  templateUrl: './motive.component.html',
  styleUrls: ['./motive.component.scss']
})
export class MotiveComponent {
  public mot: string = '';
  public updatemotive: Motive;
  public action: Boolean = true;
  public id: number;
  motive: FormGroup;
  formsend: Boolean = false;
  displayedColumns: string[] = ['motive', 'Actions'];
  dataSource: MatTableDataSource<Motive>;
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
  constructor(public MotiveService: MotiveService) {
    // Create 100 users


    // Assign the data to the data source for the table to render
    this.reloaData();
  }

  reloaData() {
    
        this.isLoading = true
        this.MotiveService.dataMotive().subscribe({
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

  createMotive() {
    this.motive = new FormGroup(
      {
        motive: new FormControl('', [Validators.required])
      }
    )
  }
  deleteMotive(id: number): void {
    this.isLoading = true

    this.MotiveService.deleteMotive(id).subscribe({
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
  uptadeMotive(motive: string, id: number): void {
    
    this.action = false;
    this.mot = motive;
    this.id = id;

  }
  ngOnInit(): void {
    this.createMotive()
  }
  onsubmit() {
    this.isLoading = true

    if (this.action) {
      this.MotiveService.NewMotive(this.motive.value).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha registrado motivo de cierre`,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar registrar motivo de cierre`,
          })
          this.isLoading = false

        }
      });
    }
    else {
      this.updatemotive = {
        id: this.id,
        motive: this.mot,
        active: true,
      }
      this.MotiveService.updateMotive(this.updatemotive).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha actualizado el motivo de cierre`,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar actualizar el motivo de cierre `,
          })
          this.isLoading = false

        }

      });

    }
    this.mot = '';
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


