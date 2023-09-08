import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Households } from './apiservice/intefacehouseholds';
import { HouseHoldService } from './apiservice/households.service';

@Component({
  selector: 'app-households',
  templateUrl: './households.component.html',
  styleUrls: ['./households.component.scss']
})
export class HouseholdsComponent {
  public hous: string = '';
  public updatediseases: Households;
  public action: Boolean = true;
  public id: number;
  households: FormGroup;
  formsend: Boolean = false;
  displayedColumns: string[] = ['household', 'Actions'];
  dataSource: MatTableDataSource<Households>;
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
  constructor(public HouseHoldService: HouseHoldService) {
    // Create 100 users


    // Assign the data to the data source for the table to render
    this.reloaData();
  }

  reloaData() {
    
        this.isLoading = true
        this.HouseHoldService.dataHouseHold().subscribe({
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

  createHouseHolds() {
    this.households = new FormGroup(
      {
        household: new FormControl('', [Validators.required])
      }
    )
  }
  deleteHouseHold(id: number): void {
    this.isLoading = true

    this.HouseHoldService.deleteHouseHold(id).subscribe({
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
  updateHouseHold(households: string, id: number): void {
    
    this.action = false;
    this.hous = households;
    this.id = id;

  }
  ngOnInit(): void {
    this.createHouseHolds()
  }
  onsubmit() {
    this.isLoading = true

    if (this.action) {
      this.HouseHoldService.NewHouseHold(this.households.value).subscribe({
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
          this.isLoading = false

        }
      });
    }
    else {
      this.updatediseases = {
        id: this.id,
        household: this.hous,
        active: true,
      }
      this.HouseHoldService.updateHouseHold(this.updatediseases).subscribe({
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
          this.isLoading = false

        }

      });

    }
    this.hous = '';
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
