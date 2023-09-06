import { NgSelectConfig } from '@ng-select/ng-select';
import * as data from './apiservice/citys/citys.json';
import { States } from './apiservice/states.intefaces';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl} from '@angular/forms';
import { Colonies } from './apiservice/colonies.interface';
import { ColoniesService } from './apiservice/colonies.service';
import Swal from 'sweetalert2';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-colonies',
  templateUrl: './colonies.component.html',
  styleUrls: ['./colonies.component.scss']
})
export class ColoniesComponent {
  idUpdate : number
  acction = true;
  selectedState: string = '';
  stateCtrl = new FormControl();
  stateskeys: States[] = [];
  municipies: States[] = [];
  colonie : Colonies ;
  showDropdown: boolean = false;
  selected = '';
  municipieSelected = '';
  dataSource: MatTableDataSource<Colonies>;
  public isLoading = true;
  displayedColumns: string[] = [ 'colony','state', 'municipy','cp','zone','Actions'];

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
  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _formBuilder: FormBuilder,public ColonieService:ColoniesService) { // Inyecta FormBuilder en el constructor
    this.reloaData()
    Object.keys(data).forEach((e, i) => {
      this.stateskeys.push({
        id: i,
        state: e
      });
    });
  }

  firstFormGroup = this._formBuilder.group({
    stateName: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    municipieName: ['', Validators.required],
    ColoniesName: ['', Validators.required],
    Cp: ['', Validators.required],
    Zone: ['', Validators.required],

  });
  isLinear = true;
  openSection(){
    this.isLinear =false;

  }


  selectState() {
    if (this.firstFormGroup.get("stateName").hasError("required")) {
      this.municipies = [];
      let nameState: string | undefined = this.stateskeys
      .filter(e => e.id === parseInt(this.selected))
      .map(e => e.state)[0];
      data[nameState].forEach((e, i) => {
        this.municipies.push({
          id:i,
          state:e
        })
      });
    }
  }
  reloaData(){
    this.ColonieService.dataColonie().subscribe({
      next:(n)=>{
        let colonies=[]
        n['data']['result'].forEach(it => {
          let searchState: string | undefined = this.stateskeys
            .filter(e => e.id === it["state"])
            .map(e => e.state)[0];
           let searchMunicipy = data[searchState][it["municipy"]];
            colonies.push({
              id:it["id"],
             state:searchState,
             stateid:it["state"], 
             municipy:searchMunicipy,
             municipyid:it["municipy"], 
             colony:it["colony"],
             cp:it["cp"],
             zone:it["zone"],

            })

        });
        
        this.dataSource = new MatTableDataSource(colonies);
        
        
        // console.log(searchState)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // this.isLoading = false
      },
      error: console.log
    })
  }
  deleteColony(id:number){
    this.ColonieService.deleteColonie(id).subscribe({
      next:(n)=>{
        this.reloaData();
        this.Toast.fire({
          position: 'top-end',
          icon: 'success',
          title: `Se ha eliminado la colonia`,
        })
        this.clear()
      },
      error:(e)=>{
        this.Toast.fire({
          position: 'top-end',
          icon: 'error',
          title: `No se ha podido eliminar la colonia`,
        })
      }
    })
  }
clear(){
  this.secondFormGroup.reset();
  this.stepper.reset();
  this.selected = '';
  this.municipieSelected = '';
  this.isLinear = true
}

  newColony(){
    if (this.acction) {
      this.colonie ={
        state:parseInt(this.selected),
        municipy:parseInt(this.secondFormGroup.get("municipieName").value),
        colony:this.secondFormGroup.get("ColoniesName").value,
        cp:parseInt(this.secondFormGroup.get("Cp").value),
        zone:this.secondFormGroup.get("Zone").value,
      }
      this.ColonieService.NewColonie(this.colonie).subscribe({
        next:(n)=>{
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha registrado la colonia ${this.secondFormGroup.get("ColoniesName").value}`,
          })
            this.clear()
         

        },
        error:(e)=>{
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar registrar la colonia`,
          })
        }
      })
    }
    else{
      let updateColonie={
        id:this.idUpdate,
        state:parseInt(this.selected),
        municipy:parseInt(this.secondFormGroup.get("municipieName").value),
        colony:this.secondFormGroup.get("ColoniesName").value,
        cp:parseInt(this.secondFormGroup.get("Cp").value),
        zone:this.secondFormGroup.get("Zone").value,
      }
      this.ColonieService.updateColonie(updateColonie).subscribe({
        next:(n)=>{
          this.reloaData();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha actualizado la colonia`,
          })
            this.clear()
            this.acction = true

        },
        error:(e)=>{
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `Se ha producido un error al intentar actualizar la colonia`,
          })
        }
      })
    }
        
    }
    showColony(row:any){
      this.clear()
      if (this.isLinear) {
        this.isLinear = false
      }
      this.acction = false
      this.idUpdate = row["id"]
      let idState: number | undefined = this.stateskeys
      .filter(e => e.state === row["state"])
      .map(e => e.id)[0];
      // let searchState: string | undefined = this.stateskeys
      // .filter(e => e.id === it["state"])
      // .map(e => e.state)[0];
      // let idMunicipy = data[searchState][it["municipy"]];

      this.selected = row["stateid"]
      this.selectState();
      this.municipieSelected = row["municipyid"]
      this.secondFormGroup.patchValue({
        municipieName: row["municipyid"],   // Establecer el valor del campo nombre
        ColoniesName: row["colony"],
        Cp:row["cp"],
        Zone:row["zone"] // Establecer el valor del campo email
      });
    }


    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
}
