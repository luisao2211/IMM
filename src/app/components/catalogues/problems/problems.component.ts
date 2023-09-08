import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import {Problems} from './apiservice/problems.inteface'
import {ProblemsService} from './apiservice/problems.service'

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.scss']
})
export class ProblemsComponent 
{
public pro: string = '';
  public updateproblem: Problems;
  public action: Boolean = true;
  public id: number;
  problems: FormGroup;
  formsend: Boolean = false;
  displayedColumns: string[] = ['problem', 'Actions'];
  dataSource: MatTableDataSource<Problems>;
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
  constructor(public ProblemsService: ProblemsService) {
    // Create 100 users


    // Assign the data to the data source for the table to render
    this.reloaData();
  }

  reloaData() {
    
        this.isLoading = true
        this.ProblemsService.dataProblems().subscribe({
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

  createProblems() {
    this.problems = new FormGroup(
      {
        problem: new FormControl('', [Validators.required])
      }
    )
  }
  deleteProblems(id: number): void {
    this.isLoading = true

    this.ProblemsService.deleteProblems(id).subscribe({
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
  uptadeProblems(problems: string, id: number): void {
    
    this.action = false;
    this.pro = problems;
    this.id = id;

  }
  ngOnInit(): void {
    this.createProblems()
  }
  onsubmit() {
    this.isLoading = true

    if (this.action) {
      this.ProblemsService.NewProblems(this.problems.value).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha registrado problema`,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar registrar problema`,
          })
          this.isLoading = false

        }
      });
    }
    else {
      this.updateproblem = {
        id: this.id,
        problem: this.pro,
        active: true,
      }
      this.ProblemsService.updateProblems(this.updateproblem).subscribe({
        next: (res) => {
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha actualizado el problema`,
          })
         
          this.isLoading = false

        },
        error: (e) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar actualizar el problema `,
          })
          this.isLoading = false

        }

      });

    }
    this.pro = '';
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


