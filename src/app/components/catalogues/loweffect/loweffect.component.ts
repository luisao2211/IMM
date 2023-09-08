import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LowEffect } from './apiservice/loweffect.interface';
import { LowEffectService } from './apiservice/loweffect.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-loweffect',
  templateUrl: './loweffect.component.html',
  styleUrls: ['./loweffect.component.scss']
})
export class LoweffectComponent {
  public lowefe: string = '';
  public updateloweffect: LowEffect;
  public action: Boolean = true;
  public id: number;
  loweffects: FormGroup;
  formsend: Boolean = false;
  displayedColumns: string[] = ['loweffect', 'Actions'];
  dataSource: MatTableDataSource<LowEffect>;
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
  constructor(public LowEffectService: LowEffectService) {
    // Create 100 users


    // Assign the data to the data source for the table to render
    this.reloaData();
  }

  reloaData() {
    
        this.isLoading = true
        this.LowEffectService.dataLowEffect().subscribe({
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

  createLowEffect() {
    this.loweffects = new FormGroup(
      {
        loweffect: new FormControl('', [Validators.required])
      }
    )
  }
  deleteLowEffect(id: number): void {
    this.isLoading = true

    this.LowEffectService.deleteLowEffect(id).subscribe({
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
  updateLowEffect(loweffects: string, id: number): void {
    
    this.action = false;
    this.lowefe = loweffects;
    this.id = id;

  }
  ngOnInit(): void {
    this.createLowEffect()
  }
  onsubmit() {
    this.isLoading = true

    if (this.action) {
      
      this.LowEffectService.NewLowEffect(this.loweffects.value).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha registrado bajo los efectos de drogas o alcohol`,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar registrar bajo los efectos de drogas o alcohol`,
          })
          this.isLoading = false

        }
      });
    }
    else {
      this.updateloweffect = {
        id: this.id,
        loweffect: this.lowefe,
        active: true,
      }
      this.LowEffectService.updateLowEffect(this.updateloweffect).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha actualizado bajo los efectos de drogas o alcohol `,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar actualizar bajo los efectos de drogas o alcohol`,
          })
          this.isLoading = false

        }

      });

    }
    this.lowefe = '';
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

