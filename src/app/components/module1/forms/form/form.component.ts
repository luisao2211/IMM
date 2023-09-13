import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Inputs } from '../../interfaces/inputs.interface';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import { Module1Service } from '../../services/module1.service';
import { SelectIndex } from '../../interfaces/selects.iterface';
import { Directive, ElementRef, HostListener } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import { Output, EventEmitter } from '@angular/core';
import { NgSwitch } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent  {
private _inputs: Inputs[] = [];
  Form: FormGroup;
  loading= false
  matcher = new ErrorStateMatcher();
  @Output() newItemEvent = new EventEmitter<boolean>();
  isFormFilled = false;
  constructor(private module1Service: Module1Service<SelectIndex>,private el: ElementRef) {
    this.Form = new FormGroup({});
  }
  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
  
    // Verifica si el campo de entrada tiene la clase "solo-numeros"
    if (input.classList.contains('numbers')) {
      input.value = input.value.replace(/[^0-9]/g, ''); // Filtra caracteres no numéricos
    }
  }
  @Input("form")
  set inputs(value: Inputs[]) {
    this._inputs = value;
    this.createFormControls();
  }

  get inputs(): Inputs[] {
    return this._inputs;
  }

  
   createFormControls() {
    this.Form = new FormGroup({});
    let urlduplicate = '';
    let valuesduplicates
    let   formName = ''
      for (let i of this.inputs) {
      if (i.url) {
        this.module1Service.data(i.url).subscribe({
          next: (n) => {
            switch (i.type) {
              case 'select':
                i.listitems = n["data"]["result"];
                break;
              case 'checkbox':
                i.checkbox = n["data"]["result"];  
                break;
             
              case 'checkboxdescription':
                i.checkbox = n["data"]["result"];
                break; 
            }
          },
        }).unsubscribe;
    } 
    
        if (i.urloadata && !i.formcontrolnameload) {
          this.module1Service.data(i.urloadata).subscribe({
            next: (n) => {
              switch (i.type) {
                case 'checkboxdescription':
                  i.itemsdescription = n["data"]["result"]
                  console.log("entro")
    
                  for (let checkbox of i.checkbox) {
                    checkbox.status = false;
                  }
                  this.loading = true
                  break;
                // case 'checkbox':
                //   i.checkbox = n["data"]["result"];  
                //   break;
               
                // case 'checkboxdescription':
                //   i.checkbox = n["data"]["result"];
                //   break;
              }
             
            },
  
          });

       
      }
      if (i.event) {
          this.addEvent(i.formcontrolname)
      }

      if (i.type !== 'checkbox' && i.type !== 'checkboxdescription') {
        this.Form.addControl(i.formcontrolname, new FormControl(i.value?i.value:'', Validators.required));

      }
    
      formName = i.formcontrolname


  }
}
  addEvent(formcontrolName){
    const element = document.querySelector(`[ng-reflect-name="${formcontrolName}"]`);
    console.log(element)
  }


  ngOnInit() {


  }

  ngOnDestroy(){

  

  };
  onSubmit(){
    console.log(this.Form.value)
    this.newItemEvent.emit(true);
  }
  addCheckbox(name,check) {
 
    check.status = !check.status;
    if (check.status === true) {
        if (!this.Form.get(name)) {
          this.Form.addControl(name, new FormControl());
          this.Form.get(name).setValue([])
        }
    } else {
        if (this.Form.get(name)) {
          const currentArray = this.Form.get(name).value;
          const newArray = currentArray.filter(item => item.groupName !== check.text && item.value !== check.value);
          this.Form.get(name).setValue(newArray);
          console.log(this.Form.value)
          if ( this.Form.get(name).value.lenght == 0) {
            this.Form.removeControl(name);
          }   
        }
       
    }
  }
  onSelectDescriptionChange(name,check,event: any): void {
    const selectedValue = event.value;
    let object = this.Form.get(name).value;
    const uniqueValues = new Set();
    object = object.filter(item => {
      if (!uniqueValues.has(item.value)) {
        uniqueValues.add(item.value);
        return true;
      }
      return false;
    });
    object.push({ "groupName": check.text, "value": check.value, "option": true, "description": selectedValue });
    this.Form.get(name).setValue(object);
    console.log(this.Form.value);

  }
  LoadDataForm(){
    alert("FUNCIONA")
  }
  
}
