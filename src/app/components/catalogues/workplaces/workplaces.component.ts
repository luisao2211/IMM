import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { WorkPlaces } from './apiservice/workplaces.interface';
import { WorkPlacesService } from './apiservice/workplaces.service';
@Component({
  selector: 'app-workplaces',
  templateUrl: './workplaces.component.html',
  styleUrls: ['./workplaces.component.scss']
})
export class WorkplacesComponent {
  public work: string = '';
  public updateWork: WorkPlaces;
  public action: Boolean = true;
  public id: number;
  workplaces: FormGroup;
  formsend: Boolean = false;
  displayedColumns: string[] = ['workplace', 'Actions'];
  dataSource: MatTableDataSource<WorkPlaces>;
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
  constructor(public WorkPlacesService: WorkPlacesService) {
    // Create 100 users


    // Assign the data to the data source for the table to render
    this.reloaData();
  }

  reloaData() {
    
        this.isLoading = true
        this.WorkPlacesService.dataWorkPlace().subscribe({
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
    this.workplaces = new FormGroup(
      {
        workplace: new FormControl('', [Validators.required])
      }
    )
  }
  deleteWorkPlace(id: number): void {
    this.isLoading = true

    this.WorkPlacesService.deleteWorkPlace(id).subscribe({
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
  updateWorkPlace(workplaces: string, id: number): void {
    
    this.action = false;
    this.work = workplaces;
    this.id = id;

  }
  ngOnInit(): void {
    this.creategender()
  }
  onsubmit() {
    this.isLoading = true

    if (this.action) {
      
      this.WorkPlacesService.NeWorkPlace(this.workplaces.value).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha registrado el lugar de trabajo`,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar registrar lugar de trabajo`,
          })
         
        }
      });
    }
    else {
      this.updateWork = {
        id: this.id,
        workplace: this.work,
        active: true,
      }
      this.WorkPlacesService.updateWorkPlace(this.updateWork).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha actualizado  el lugar de trabajo `,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar actualizar el lugar de trabajo `,
          })
       
        }

      });

    }
    this.work = '';
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
