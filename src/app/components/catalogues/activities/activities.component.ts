import { Component, ViewChild } from '@angular/core';
import { Activities } from './apiservice/intefaceactivities';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { ActivitiesService } from './apiservice/activies.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent {
  public activity: string = '';
  public updateactivity: Activities;
  public action: Boolean = true;
  public id: number;
  activitys: FormGroup;
  formsend: Boolean = false;
  displayedColumns: string[] = ['activity', 'Actions'];
  dataSource: MatTableDataSource<Activities>;
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
  constructor(public ActivitiesService: ActivitiesService) {
    // Create 100 users


    // Assign the data to the data source for the table to render
    this.reloaData();
  }

  reloaData() {
    
        this.isLoading = true
        this.ActivitiesService.dataActivities().subscribe({
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

  creategender() {
    this.activitys = new FormGroup(
      {
        activity: new FormControl('', [Validators.required])
      }
    )
  }
  deleteActivity(id: number): void {
    this.isLoading = true

    this.ActivitiesService.deleteActivities(id).subscribe({
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
  updateActivitiy(activitys: string, id: number): void {
    
    this.action = false;
    this.activity = activitys;
    this.id = id;

  }
  ngOnInit(): void {
    this.creategender()
  }
  onsubmit() {
    this.isLoading = true

    if (this.action) {
      
      this.ActivitiesService.NewActivities(this.activitys.value).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha registrado la actividad`,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar registrar la actividad`,
          })
          this.isLoading = false

        }
      });
    }
    else {
      this.updateactivity = {
        id: this.id,
        activity: this.activity,
        active: true,
      }
      this.ActivitiesService.updateActivities(this.updateactivity).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha actualizado la actividad `,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar actualizar la actividad`,
          })
          this.isLoading = false

        }

      });

    }
    this.activity = '';
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
