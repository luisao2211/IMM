import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AdicctionsService } from './apiservice/adicctions.service';
import { Adicctions } from './apiservice/intefaceaddictions';

@Component({
  selector: 'app-adicctions',
  templateUrl: './adicctions.component.html',
  styleUrls: ['./adicctions.component.scss']
})
export class AdicctionsComponent {
  public add: string = '';
  public updateaddiction: Adicctions;
  public action: Boolean = true;
  public id: number;
  addictions: FormGroup;
  formsend: Boolean = false;
  displayedColumns: string[] = ['addiction', 'Actions'];
  dataSource: MatTableDataSource<Adicctions>;
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
  constructor(public AdicctionsService: AdicctionsService) {
    // Create 100 users


    // Assign the data to the data source for the table to render
    this.reloaData();
  }

  reloaData() {
    
        this.isLoading = true
        this.AdicctionsService.dataAdicction().subscribe({
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

  createAdicction() {
    this.addictions = new FormGroup(
      {
        addiction: new FormControl('', [Validators.required])
      }
    )
  }
  deleteAdicction(id: number): void {
    this.isLoading = true

    this.AdicctionsService.deleteAdicction(id).subscribe({
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
  updateAdicction(addictions: string, id: number): void {
    
    this.action = false;
    this.add = addictions;
    this.id = id;

  }
  ngOnInit(): void {
    this.createAdicction()
  }
  onsubmit() {
    this.isLoading = true

    if (this.action) {
      this.AdicctionsService.NewAdicction(this.addictions.value).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha registrado la nueva vivienda`,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar registrar la vivienda`,
          })
         
        }
      });
    }
    else {
      this.updateaddiction = {
        id: this.id,
        addiction: this.add,
        active: true,
      }
      this.AdicctionsService.updateAdicction(this.updateaddiction).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha actualizado la vivienda`,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar actualizar vivienda `,
          })
       
        }

      });

    }
    this.add = '';
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
