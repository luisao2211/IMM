import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Diseases } from './apiservice/intefacediseases';
import {DiseaseService} from './apiservice/diseases.service'
@Component({
  selector: 'app-diseases',
  templateUrl: './diseases.component.html',
  styleUrls: ['./diseases.component.scss']
})
export class DiseasesComponent {
  public dis: string = '';
  public updatediseases: Diseases;
  public action: Boolean = true;
  public id: number;
  diseases: FormGroup;
  formsend: Boolean = false;
  displayedColumns: string[] = ['diseas', 'Actions'];
  dataSource: MatTableDataSource<Diseases>;
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
  constructor(public DiseaseService: DiseaseService) {
    // Create 100 users


    // Assign the data to the data source for the table to render
    this.reloaData();
  }

  reloaData() {
    
        this.isLoading = true
        this.DiseaseService.dataDiseases().subscribe({
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

  createDiseases() {
    this.diseases = new FormGroup(
      {
        diseas: new FormControl('', [Validators.required])
      }
    )
  }
  deleteDiseases(id: number): void {
    this.isLoading = true

    this.DiseaseService.deleteDiseases(id).subscribe({
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
  updateDiases(diseases: string, id: number): void {
    
    this.action = false;
    this.dis = diseases;
    this.id = id;

  }
  ngOnInit(): void {
    this.createDiseases()
  }
  onsubmit() {
    this.isLoading = true

    if (this.action) {
      this.DiseaseService.NewDiseases(this.diseases.value).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha registrado la nueva enfermedad o dificultad de salud`,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar registrar la enfermedad o dificultad de salud`,
          })
         
        }
      });
    }
    else {
      this.updatediseases = {
        id: this.id,
        diseas: this.dis,
        active: true,
      }
      this.DiseaseService.updateDiseases(this.updatediseases).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha actualizado la enfermedad o dificultad de salud`,
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
