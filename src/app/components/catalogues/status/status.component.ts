import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Status } from './apiservice/status.interface';
import { StatusService } from './apiservice/status.service';



@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {
  public stat: string = '';
  public updatestatus: Status;
  public action: Boolean = true;
  public id: number;
  status: FormGroup;
  formsend: Boolean = false;
  displayedColumns: string[] = ['status', 'Actions'];
  dataSource: MatTableDataSource<Status>;
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
  constructor(public StatusService: StatusService) {
    // Create 100 users


    // Assign the data to the data source for the table to render
    this.reloaData();
  }

  reloaData() {
    
        this.isLoading = true
        this.StatusService.dataStatus().subscribe({
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

  createStatus() {
    this.status = new FormGroup(
      {
        status: new FormControl('', [Validators.required])
      }
    )
  }
  deleteStatus(id: number): void {
    this.isLoading = true

    this.StatusService.deleteStatus(id).subscribe({
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
  updateStatus(status: string, id: number): void {
    
    this.action = false;
    this.stat = status;
    this.id = id;

  }
  ngOnInit(): void {
    this.createStatus()
  }
  onsubmit() {
    this.isLoading = true

    if (this.action) {
      console.log(this.status.value)
      this.StatusService.NewStatus(this.status.value).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha registrado el status`,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar registrar el status`,
          })
          this.isLoading = false

        }
      });
    }
    else {
      this.updatestatus = {
        id: this.id,
        status: this.stat,
        active: true,
      }
      this.StatusService.updateStatus(this.updatestatus).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha actualizado el status `,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar actualizar el status`,
          })
          this.isLoading = false

        }

      });

    }
    this.stat = '';
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
