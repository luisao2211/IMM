import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Training } from './apiservice/trainings.interface';
import { TrainingService } from './apiservice/trainings.service';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss']
})
export class TrainingsComponent {
  public train: string = '';
  public updatetraining: Training;
  public action: Boolean = true;
  public id: number;
  training: FormGroup;
  formsend: Boolean = false;
  displayedColumns: string[] = ['training', 'Actions'];
  dataSource: MatTableDataSource<Training>;
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
  constructor(public TrainingService: TrainingService) {
    // Create 100 users


    // Assign the data to the data source for the table to render
    this.reloaData();
  }

  reloaData() {
    
        this.isLoading = true
        this.TrainingService.dataTraining().subscribe({
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

  createTraining() {
    this.training = new FormGroup(
      {
        training: new FormControl('', [Validators.required])
      }
    )
  }
  deleteTraining(id: number): void {
    this.isLoading = true

    this.TrainingService.deleteTraining(id).subscribe({
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
  updateTraining(training: string, id: number): void {
    
    this.action = false;
    this.train = training;
    this.id = id;

  }
  ngOnInit(): void {
    this.createTraining()
  }
  onsubmit() {
    this.isLoading = true

    if (this.action) {
      
      this.TrainingService.NeTraining(this.training.value).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha registrado la formación educativa`,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar registrar la formación educativa`,
          })
          this.isLoading = false

        }
      });
    }
    else {
      this.updatetraining = {
        id: this.id,
        training: this.train,
        active: true,
      }
      this.TrainingService.updateTraining(this.updatetraining).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha actualizado la formación educativa `,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar actualizar la formación educativa`,
          })
          this.isLoading = false

        }

      });

    }
    this.train = '';
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

