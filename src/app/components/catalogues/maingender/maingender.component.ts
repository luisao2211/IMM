import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Gender } from './apiservice/intefacegender';
import { GenderService } from './apiservice/gender.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maingender',
  templateUrl: './maingender.component.html',
  styleUrls: ['./maingender.component.scss']
})
export class MaingenderComponent {
  public gen: string = '';
  public updategender: Gender;
  public action: Boolean = true;
  public id: number;
  gender: FormGroup;
  formsend: Boolean = false;
  displayedColumns: string[] = ['gender', 'Actions'];
  dataSource: MatTableDataSource<Gender>;
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
  constructor(public GenderService: GenderService) {
    // Create 100 users


    // Assign the data to the data source for the table to render
    this.reloaData();
  }

  reloaData() {
    
        this.isLoading = true
        this.GenderService.dataGenders().subscribe({
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
    this.gender = new FormGroup(
      {
        gender: new FormControl('', [Validators.required])
      }
    )
  }
  deleteGender(id: number): void {
    this.isLoading = true

    this.GenderService.deleteGender(id).subscribe({
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
  updateGender(gender: string, id: number): void {
    
    this.action = false;
    this.gen = gender;
    this.id = id;

  }
  ngOnInit(): void {
    this.creategender()
  }
  onsubmit() {
    this.isLoading = true

    if (this.action) {
      
      this.GenderService.NewGender(this.gender.value).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha registrado el género ${this.gender.value.gender}`,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar registrar el género ${this.gender.value.gender}`,
          })
          this.isLoading = false

        }
      });
    }
    else {
      this.updategender = {
        id: this.id,
        gender: this.gen,
        active: true,
      }
      this.GenderService.updateGender(this.updategender).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha actualizado el género `,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar actualizar el género `,
          })
          this.isLoading = false

        }

      });

    }
    this.gen = '';
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
