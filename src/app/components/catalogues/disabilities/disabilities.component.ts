import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Disabilites } from './apiservice/intefacedisabilities';
import { DisabilitesService } from './apiservice/disabilities.service';


@Component({
  selector: 'app-disabilities',
  templateUrl: './disabilities.component.html',
  styleUrls: ['./disabilities.component.scss']
})
export class DisabilitiesComponent {
  public dis: string = '';
  public updatedisabilities: Disabilites;
  public action: Boolean = true;
  public id: number;
  disabilities: FormGroup;
  formsend: Boolean = false;
  displayedColumns: string[] = ['disability', 'Actions'];
  dataSource: MatTableDataSource<Disabilites>;
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
  constructor(public DisabilitesService: DisabilitesService) {
    // Create 100 users


    // Assign the data to the data source for the table to render
    this.reloaData();
  }

  reloaData() {
    
        this.isLoading = true
        this.DisabilitesService.dataDisabilites().subscribe({
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

  createDisabilites() {
    this.disabilities = new FormGroup(
      {
        disability: new FormControl('', [Validators.required])
      }
    )
  }
  deleteDisabilites(id: number): void {
    this.isLoading = true

    this.DisabilitesService.deleteDisabilites(id).subscribe({
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
  updateDisabilites(disabilities: string, id: number): void {
    
    this.action = false;
    this.dis = disabilities;
    this.id = id;

  }
  ngOnInit(): void {
    this.createDisabilites()
  }
  onsubmit() {
    this.isLoading = true

    if (this.action) {
      this.DisabilitesService.NewDisabilites(this.disabilities.value).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha registrado la nueva discapacidad`,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar registrar la discapacidad`,
          })
         
        }
      });
    }
    else {
      this.updatedisabilities = {
        id: this.id,
        disability: this.dis,
        active: true,
      }
      this.DisabilitesService.updateDisabilites(this.updatedisabilities).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha actualizado la discapacidad`,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar actualizar discapacidad`,
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
