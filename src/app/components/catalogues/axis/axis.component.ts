import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AxisService } from './apiservice/axis.service';
import { Axis } from './apiservice/axis.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-axis',
  templateUrl: './axis.component.html',
  styleUrls: ['./axis.component.scss']
})
export class AxisComponent {
  public axi: string = '';
  public updateaxis: Axis;
  public action: Boolean = true;
  public id: number;
  axis: FormGroup;
  formsend: Boolean = false;
  displayedColumns: string[] = ['axi', 'Actions'];
  dataSource: MatTableDataSource<Axis>;
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
  constructor(public AxisService: AxisService) {
    // Create 100 users


    // Assign the data to the data source for the table to render
    this.reloaData();
  }

  reloaData() {
    
        this.isLoading = true
        this.AxisService.dataAxis().subscribe({
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

  createAxis() {
    this.axis = new FormGroup(
      {
        axi: new FormControl('', [Validators.required])
      }
    )
  }
  deleteAxis(id: number): void {
    this.isLoading = true

    this.AxisService.deleteAxis(id).subscribe({
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
  updateAxis(axis: string, id: number): void {
    
    this.action = false;
    this.axi = axis;
    this.id = id;

  }
  ngOnInit(): void {
    this.createAxis()
  }
  onsubmit() {
    this.isLoading = true

    if (this.action) {
      
      this.AxisService.NewAxis(this.axis.value).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha registrado el eje`,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar registrar el eje`,
          })
          this.isLoading = false

        }
      });
    }
    else {
      this.updateaxis = {
        id: this.id,
        axi: this.axi,
        active: true,
      }
      this.AxisService.updateAxis(this.updateaxis).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha actualizado el eje `,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar actualizar el eje`,
          })
          this.isLoading = false

        }

      });

    }
    this.axi = '';
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
