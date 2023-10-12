import { Component, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { Crud, Inputs } from '../../interfaces/inputs.interface';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl, FormGroupDirective } from '@angular/forms';
import { ModulesService } from '../../services/modules.service';
import { SelectIndex } from '../../interfaces/selects.iterface';
import { ElementRef, HostListener } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { Cp } from '../../interfaces/cp.interface';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { style } from '@angular/animations';
import { error, event } from 'jquery';
import { Observable, of } from 'rxjs';
import { startWith, map, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnChanges {
  private _inputs: Inputs[] = [];
  private array = []
  private valuesSelects = []
  private selects = []
  private listItemSelect = []
  @Input("infoForm") infoForm
  @Input() clearForm
  @Input() afterwindows
  @Input() advertice
  @Input() crud: Crud
  @ViewChild('inputColonies') inputColonies: ElementRef;
  @ViewChild('inputElement') inputElement: ElementRef; // Referencia al elemento input
  @ViewChild(FormGroupDirective) myForm;
  cpNumber: any;
  @Output() formWrite = new EventEmitter<boolean>();

  Form: FormGroup;
  loading = false
  matcher = new ErrorStateMatcher();
  @Output() newItemEvent = new EventEmitter<boolean>();
  @Output() FormGroup = new EventEmitter<any>();
  @Output() AfterStepper = new EventEmitter<boolean>();
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
  public isLoading = false;
  isFormFilled = false;
  constructor(private modulesService: ModulesService<SelectIndex>, private CpService: ModulesService<Cp>, private elRef: ElementRef) {
    
    this.Form = new FormGroup({});
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes["clearForm"]) {
      if (changes["clearForm"].currentValue ==true) {
          this.myForm.resetForm();
        
      }
    }
    if (changes["inputs"]) {

      if (changes["inputs"].currentValue != changes["inputs"].previousValue) {
        this.myForm.resetForm();

        this._inputs = changes["inputs"].currentValue
        this.updateFormValues(this._inputs);

      }
    }
    if (changes["infoForm"] && changes["infoForm"].currentValue) {

      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;

        // this.isLoading = false;
      }, 2000);
      
      this.array = []
      this.infoForm = changes["infoForm"].currentValue[0];
      for (const infoName of Object.keys(this.infoForm)) {

        const value = this.infoForm[infoName];
        if (infoName == "diseas_ids" || infoName == 'diseas_origin_id' || infoName == 'disability_ids' || infoName == 'disability_origin_id'
          || infoName == 'user_violence_fields' || infoName == 'fieldsviolence_id' || infoName == 'medicalservices' || infoName == 'adicttions'
          || infoName == 'workplaces' 

        ) {
          if (value) {
            let checkbox = value.split(",");
            // console.warn(checkbox)
            if (Array.isArray(checkbox)) {
              checkbox.forEach(item => {
                this.array.push(item)
              }
              )
            }

          }

        }

        if (this.Form.controls.hasOwnProperty(infoName)) {
          if (infoName != "colonies_id") {
              const ValuesSelectIndex = this.inputs.findIndex((e) => e.formcontrolname === infoName && e.type =='select')
              if (ValuesSelectIndex>-1) {
              if (this.inputs[ValuesSelectIndex].listitems) {
                this.inputs[ValuesSelectIndex].listitems.forEach(e=>{
                  if (e.value ==value) {
                    this.onSelect(infoName,value)
                    this.Form.get(infoName).setValue(e.text)
                  }
              })
              }
              else{
                this.valuesSelects.push({name:infoName,value:value})
              }
              continue
            }
              this.Form.get(infoName).setValue(value);
          }


          // this.Form.get(infoName).setValue(value);            
          // loadDataDoubleSelect
          if (infoName == "colonies_id") {
            const indexEncontrado = this.inputs.findIndex((elemento) => elemento.type === 'cp');
            this.modulesService.OtherRoute(`https://api.gomezpalacio.gob.mx/api/cp/colonia/${value}`).subscribe({
              next: (n) => {
                this.Form.get("cp").setValue(n["data"]["result"]["CodigoPostal"]);
                this.cp(n["data"]["result"]["CodigoPostal"], indexEncontrado, value)
              },
              error:(e)=>{
                this.isLoading = false
              }

            })

          }
          if (infoName == "axi_id") {
            const indexEncontrado = this.inputs.findIndex((elemento) => elemento.type === 'doubleselect');
            this.loadDataDoubleSelect(this.Form.get(infoName).value, indexEncontrado)
          }
          // delete this.infoForm[infoName]; 
        }
      }


    }



    // console.warn(this.infoForm)


  }
  ngOnInit() {
    this._inputs = []
  }


  updateFormValues(newValues: any): void {
    this.Form.patchValue(newValues);
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.classList.contains('numbers')) {
      input.value = input.value.replace(/[^0-9]/g, '');
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
    if (this.inputs !== undefined) {
      for (let [index, i] of this.inputs.entries()) {
        if (i.url || i.otherurl) {
          let useurl = true
          if (i.otherurl) {
            useurl = false
            i.url = i.otherurl
          }
           this.modulesService.data(i.url, useurl).subscribe({
            next: (n) => {
               switch (i.type) {
                case 'select':
                  i.listitems = n["data"]["result"];
                  this.listItemSelect.push({
                    select:i.formcontrolname,
                    options:i.listitems
                  })
                  this.autocomplete(index,i.formcontrolname,i.listitems)
                  const valuesIndex = this.valuesSelects.findIndex(e=>e.name == i.formcontrolname)
                  if (valuesIndex>-1) {
                      i.listitems.forEach(e=>{
                          if (e.value ==this.valuesSelects[valuesIndex].value) {
                              this.Form.get(i.formcontrolname).setValue(e.text)
                              this.onSelect(i.formcontrolname,e.value)
                          }
                      })
                  }
                break
                case 'doubleselect':
                  i.listitems = n["data"]["result"];
                  break;
                case 'checkbox':
                  i.checkbox = n["data"]["result"];

                  for (let checkbox of i.checkbox) {
                    // console.warn(checkbox.text + checkbox.value,this.array)
                    this.Form.addControl(checkbox.text + checkbox.value, new FormControl());
                    checkbox.status = false
                    if (this.array.includes(checkbox.text + checkbox.value)) {
                      this.Form.get(checkbox.text + checkbox.value).setValue(true)
                      checkbox.status = true
                      this.addChecked(i.formcontrolname, checkbox)
                    }

                  }
                  break;
                case 'checkboxdescription':
                  i.checkbox = n["data"]["result"];
                  
                  for (let checkbox of i.checkbox) {
                    checkbox.status = false
                    this.Form.addControl(checkbox.text + checkbox.value, new FormControl());
                    this.Form.addControl(checkbox.text + checkbox.value + "_description", new FormControl());
                    if (this.array.includes(checkbox.text + checkbox.value)) {
                      this.Form.get(checkbox.text + checkbox.value).setValue(true)
                      // console.log(checkbox.text + checkbox.value, this.array)
                      checkbox.status = true
                      this.addCheckbox(i.formcontrolname, checkbox)

                    }


                  }
                  //   for (const controlName in this.Form.controls) {
                  //     const control = this.Form.get(controlName);
                  //     console.log(`Nombre del control: ${controlName}`);
                  //     console.error(`Valor del control: ${control.value}`);
                  //     // Puedes imprimir más propiedades del control según tus necesidades.
                  // }
                  break;
              }
            },
         
          }).unsubscribe;
        }
        if (i.urloadata && !i.secondcontrolname) {
          this.modulesService.data(i.urloadata).subscribe({
            next: async (n) => {
              
              switch (i.type) {
                case 'checkboxdescription':

                  i.itemsdescription = await n["data"]["result"]


                  // this.Form.get("").setValue(1);
                  // console.log("entre")
                  for (let checkbox of i.checkbox) {
                    checkbox.status = true;
                    if (this.array.includes(checkbox.text + checkbox.value)) {
                      const index = this.array.indexOf(checkbox.text + checkbox.value + "_description");
                      this.Form.get(checkbox.text + checkbox.value + "_description").setValue(parseInt(this.array[index + 1]))
                      checkbox.status = false;
                      this.onSelectDescriptionChange(i.formcontrolname, checkbox, parseInt(this.array[index + 1]))
                      // this.objects.push({ "groupName": checkbox.text, "value": checkbox.value, "option": true, "origin_id": parseInt(this.array[index +1]) })
                    }
                    else {
                      console.error
                    }

                  }
                  break;
              }

            },

          });


        }

        if (i.event) {
          this.addEvent(i.formcontrolname)
        }

        if (i.type !== 'checkbox' && i.type !== 'checkboxdescription'&& i.type !== 'email') {
          this.Form.addControl(i.formcontrolname, new FormControl(i.value ? i.value : '', Validators.required));
          if (i.secondcontrolname) {
            this.Form.addControl(i.secondcontrolname, new FormControl(i.value ? i.value : '', Validators.required));
          }
          if (i.formcontrolmunicipy) {
            this.Form.addControl(i.formcontrolmunicipy, new FormControl(i.value ? i.value : '', Validators.required));

          }
          if (i.formcontrolstate) {
            this.Form.addControl(i.formcontrolstate, new FormControl(i.value ? i.value : '', Validators.required));

          }
          if (i.formcontrolcp) {
            this.Form.addControl(i.formcontrolcp, new FormControl(i.value ? i.value : '', Validators.required));

          }
        }
        if (i.type == 'email') {
          this.Form.addControl(i.formcontrolname, new FormControl(i.value ? i.value : '', [Validators.required,Validators.email]));

        }



      }

    }

  }
  addEvent(formcontrolName) {
    const element = document.querySelector(`[ng-reflect-name="${formcontrolName}"]`);
    // console.log(element)
  }

  onSubmit() {
    const FormValues = {}; // Inicializamos como un objeto vacío

    Object.keys(this.Form.controls).forEach(controlName => {
      // Obtiene el valor del control
      const controlValue = this.Form.get(controlName)?.value;
      // Imprime el nombre del control y su valor
      let valueFromSelects = null; // Inicializamos como nulo
      this.selects.some(item => {
        if (item.hasOwnProperty(controlName)) {
          valueFromSelects = item;
          return true; // Detiene la iteración una vez que se encuentra el valor
        }
        return false;
      });
      if (valueFromSelects !== null) {
        FormValues[Object.keys(valueFromSelects)[0]] = Object.values(valueFromSelects)[0]; // Asignamos el valor al objeto usando controlName como clave
      }
      else{
        FormValues[controlName] = controlValue; // Asignamos el valor al objeto usando controlName como clave

      }
    });
    
    
    if (this.crud?.post && !this.AfterStepper) {
      this.modulesService.Post(this.crud.post, this.Form.value).subscribe({
        next: (n) => {
          // this.myForm.resetForm();
          this.Toast.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha Guardado Correctamente`,
          })

        },
        error: (n) => {
          this.Toast.fire({
            position: 'top-end',
            icon: 'error',
            title: `No se pudo guardar`,
          })
        }
      })
    } else {
      this.FormGroup.emit(FormValues)
      // this.myForm.resetForm();
      // this._inputs = []

    }
    this.newItemEvent.emit(true);
    this.selects =[]
  }
  addCheckbox(name, check, namefalse?) {
    check.status = !check.status;

    if (check.status === false) {
      if (!this.Form.get(name)) {
        this.Form.addControl(name, new FormControl());
        this.Form.get(name).setValue([])
      }
    } else {
      if (this.Form.get(name)) {
        const currentArray = this.Form.get(name).value;
        this.Form.get(check.text +check.value +"_description").setValue(null)
        const newArray = currentArray.filter(item => item.groupName !== check.text && item.value !== check.value);
        this.Form.get(name).setValue(newArray);
        // console.log(this.Form.value)
        if (this.Form.get(name).value.lenght == 0) {
          this.Form.removeControl(name);
        }
      }

    }
  }

  formatPhoneNumber(event: Event) {
    // Obtén el valor actual del campo de entrada
    let phoneNumber = (event.target as HTMLInputElement).value;
  
    // Elimina caracteres no numéricos
    phoneNumber = phoneNumber.replace(/\D/g, '');
  
    // Aplica el formato (xxx) xxx xxxx
    if (phoneNumber.length >= 10) {
      phoneNumber = `(${phoneNumber.substr(0, 3)}) ${phoneNumber.substr(3, 3)} ${phoneNumber.substr(6, 4)}`;
    }
  
    // Actualiza el valor del campo de entrada con el formato
    (event.target as HTMLInputElement).value = phoneNumber;
  }
  
  
  addChecked(name, check) {

    if (!this.Form.get(name)) {
      this.Form.addControl(name, new FormControl());
      this.Form.get(name).setValue([{ "groupName": check.text, "value": check.value, "option": true }])
      // console.log("ENTREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE", this.Form.get(name).value)
    }
    else {
      if (this.Form.get(name)) {
        const currentArray = this.Form.get(name).value;
        let newArray = []
        newArray.push(...currentArray)
        let position = newArray.findIndex(item => item.groupName === check.text);
        if (position !== -1) {
          newArray.splice(position, 1)
          // console.log("array", newArray)
          this.Form.get(name).setValue(newArray);
          return
        }
        newArray.push({ "groupName": check.text, "value": check.value, "option": true });
        const uniqueValues = new Set();
        newArray = newArray.filter(item => {
          if (!uniqueValues.has(item.value)) {
            uniqueValues.add(item.value);
            return true;
          }
          return false;
        });
        this.Form.get(name).setValue(newArray);
        // console.log("else", this.Form.get(name).value)
        if (this.Form.get(name).value.lenght == 0) {
          this.Form.removeControl(name);
        }
      }

    }
  }
  onOptionSelected(event,listitems){
   
  }
  onSelectDescriptionChange(name, check, event: any): void {
    const selectedValue = event;
    console.warn(this.Form.get(name))
    let object = this.Form.get(name).value;
    // console.log("OBJECTO", object)
    const uniqueValues = new Set();
    object = object.filter(item => {
      if (!uniqueValues.has(item.value)) {
        uniqueValues.add(item.value);
        return true;
      }
      return false;
    });
    object.push({ "groupName": check.text, "value": check.value, "option": true, "origin_id": selectedValue });
    this.Form.get(name).setValue(object);
    // console.log(this.Form.value);

  }
  loadDataDoubleSelect(selectValue, index, value?) {
    {
      const url = this.inputs[index].urloadata
      this.modulesService.data(`${url}/${selectValue}`).subscribe({
        next: (n) => {
          this.inputs[index].secondlistitems = n["data"]["result"]
          value ? this.Form.get(this.inputs[index].secondcontrolname).setValue(value) : '';

        },
        error:(e)=>{
  
        }
      });
    }
  }
  AfterWindowsStepper() {
    this.AfterStepper.emit(true);

  }
  validatePostalCode(event: Event) {
    // Obtén el valor actual del campo de entrada
    let postalCode = (event.target as HTMLInputElement).value;
  
    // Elimina caracteres no numéricos
    postalCode = postalCode.replace(/\D/g, '');
  
    // Limita la entrada a un máximo de 5 números
    postalCode = postalCode.substr(0, 5);
  
    // Actualiza el valor del campo de entrada con el CP formateado
    (event.target as HTMLInputElement).value = postalCode;
  }
  
  cp(event, index, value?) {
    // this.isLoading= true
    this.CpService.OtherRoute(`https://api.gomezpalacio.gob.mx/api/cp/${event.target?.value || event}`).subscribe({
      next: (n) => {
        this.inputs[index].cps = n["data"]["result"]
        this.Form.get(this.inputs[index].formcontrolmunicipy).setValue(n["data"]["result"][0].Municipio)
        this.Form.get(this.inputs[index].formcontrolstate).setValue(n["data"]["result"][0].Estado)
        value ? this.Form.get(this.inputs[index].formcontrolname).setValue(value) : '';
        // this.isLoading = false
        setTimeout(() => {
          if (!this.Form.get(this.inputs[index].formcontrolmunicipy).value) {
            this.Toast.fire({
              position: 'center',
              icon: 'warning',
              title: "No existe el código postal",
            });
          }
          else{
            this.Toast.fire({
              position: 'center',
              icon: 'success',
              title: "Ingresa la colonia",
            });
          }
          
        },500)
      },
      error:(e)=>{
        if (!this.Form.get(this.inputs[index].formcontrolmunicipy).value) {
          this.Toast.fire({
            position: 'top-end',
            icon: 'warning',
            title: "No existe el código postal",
          });
        }
      },
      complete() {
        
       
      },

    })
  }
  onSelect(name,id){
    const exist = this.selects.filter(e=>e.name == name)
    if (exist.length>0) 
          this.selects = this.selects.filter(e=>e.name != name)
    this.selects.push({
      [name]: id
    })
  }

  autocomplete(index, myControl, listitems) {
 
    const textArray: string[] = Object.values(listitems).map(item => item['text']);
    this.Form.get(myControl).valueChanges.subscribe((newValue) => {
      this.listItemSelect.forEach(it=>{
        if (it['select']==myControl) {
          this.inputs[index].listitems =it['options']
        }
       
      }) 

      const filteredOptions = textArray.filter(option =>
        option.toLowerCase().includes(newValue.toLowerCase())
      );
      this.inputs[index].listitems = this.inputs[index].listitems.filter(e =>
        filteredOptions.includes(e.text)
      );
      
  
    });
  
  }
  
  
}



