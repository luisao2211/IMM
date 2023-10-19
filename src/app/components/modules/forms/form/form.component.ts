import { Component, Inject, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
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
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnChanges {

  //         this.onSelect(infoName, value)
  //         this.Form.get(infoName).setValue(e.text)
  //       }
  //     })
  //   }
  //   else {
  //     this.valuesSelects.push({ name: infoName, value: value })
  //   }
  //   continue
  // }
  private _inputs: Inputs[] = [];
  private array = []
  private valuesSelects = []
  private selects = []
  private listItemSelect = []
  @Input("infoForm") infoForm
  @Input() clearForm
  @Input() afterwindows
  @Input() advertice
  @Input() ErrorLoadInfo

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
  constructor(private modulesService: ModulesService<SelectIndex>, private CpService: ModulesService<Cp>, private elRef: ElementRef, public dialog: MatDialog) {

    this.Form = new FormGroup({});
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes["clearForm"]) {
      if (changes["clearForm"].currentValue == true) {
        this.myForm.resetForm();

      }
    }
    if (changes["inputs"]) {

      if (changes["inputs"].currentValue != changes["inputs"].previousValue) {
        if (this.myForm) {
          this.myForm.resetForm();

        }
        this._inputs = changes["inputs"].currentValue
        this.updateFormValues(this._inputs);

      }
    }
    if (changes["infoForm"] && changes["infoForm"].currentValue) {

      if (Array.isArray(this.infoForm) && this.infoForm.length === 0 && !changes["infoForm"].firstChange) {
        this.Toast.fire({
          position: 'top-end',
          icon: 'warning',
          title: `
          No se tiene informacion en este apartado
          `,
        });
        return; // Agrega un return para detener la ejecución
      }
      this.isLoading = true;

      let timeLoadSpinner = Object.values(this.infoForm[0]).length
      let time = timeLoadSpinner * 200
      setTimeout(() => {
        this.isLoading = false;

        // this.isLoading = false;
      }, time);

      this.array = []
      this.infoForm = changes["infoForm"].currentValue[0];
      let indice = 0
      // {
      // 
      //   "disability_ids": "Motriz1",
      //   "disability_origin_id": "Motriz1_description,5"
      // }


      for (const infoName of Object.keys(this.infoForm)) {
        const value = this.infoForm[infoName];
        if (infoName == "diseas_ids" || infoName == 'diseas_origin_id' || infoName == 'disability_ids' || infoName == 'disability_origin_id'
          || infoName == 'user_violence_fields' || infoName == 'fieldsviolence_id' || infoName == 'medicalservices' || infoName == 'adicttions'
          || infoName == 'workplaces'

        ) {
          if (value) {
            let checkbox = value.split(",");
            //ANGEL
            checkbox.forEach((it, i) => {
              if (this.Form.controls.hasOwnProperty(it)) {
                // console.warn(it)

                this.inputs.forEach((item, inputindex) => {

                  if (item.type === "checkboxdescription" || item.type == "checkbox") {

                    item.checkbox.forEach((element, index) => {
                      if (element.text + element.value == it && item.type == "checkboxdescription") {
                        // this.Form.removeControl(it)
                        element.status = true
                        this.addCheckbox(item.formcontrolname, element)

                        let contador = 0
                        let namekey = null
                        for (const name of Object.keys(this.infoForm)) {
                          if (name == infoName) {
                            contador = 1
                            continue
                          }
                          if (contador == 1) {
                            namekey = name
                            break;
                          }


                        }
                        let valuesNameKey = this.infoForm[namekey]
                        valuesNameKey = valuesNameKey.split(",");
                        let valor = valuesNameKey.findIndex((e) => e === element.text + element.value + "_description")
                        // if (indice <= this.infoForm.length) {

                        // "diseas_ids": ["Gastrointestinales3,Infecciosas6"],
                        //   "diseas_origin_id": "Gastrointestinales3_description,2,Infecciosas6_description,2",

                        // }
                        // console.error(this.infoForm[indice + 1])

                        this.Form.get(element.text + element.value + "_description").setValue(parseInt(valuesNameKey[valor + 1]))

                        this.onSelectDescriptionChange(item.formcontrolname, element, parseInt(valuesNameKey[valor + 1]))
                      }
                      if (element.text + element.value == it && item.type == "checkbox") {
                        element.status = true
                        this.addChecked(item.formcontrolname, element)

                      }







                    });


                    // this.addChecked(item.formcontrolname,)
                    // this.onSelectDescriptionChange(it,)
                  }
                });
              }

            });
            const ValuesSelectIndex = this.inputs.findIndex((e) => e.formcontrolname === infoName)
            //  console.error(this.inputs,this.Form.controls.hasOwnProperty(infoName),ValuesSelectIndex,this.inputs[ValuesSelectIndex])
            //this.addChecked(infoName, checkbox)

            // if (Array.isArray(checkbox)) {
            //   checkbox.forEach(item => {
            //     this.array.push(item)
            //   }
            //   )
            // }

          }

        }

        if (this.Form.controls.hasOwnProperty(infoName)) {
          if (infoName != "colonies_id") {
            // const ValuesSelectIndex = this.inputs.findIndex((e) => e.formcontrolname === infoName && e.type == 'select')
            // if (ValuesSelectIndex > -1) {
            //   if (this.inputs[ValuesSelectIndex].listitems) {
            //     this.inputs[ValuesSelectIndex].listitems.forEach(e => {
            //       if (e.value == value) {
            //         this.onSelect(infoName, value)
            //         this.Form.get(infoName).setValue(e.text)
            //       }
            //     })
            //   }
            //   else {
            //     this.valuesSelects.push({ name: infoName, value: value })
            //   }
            //   continue
            // }
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
              error: (e) => {
                this.isLoading = false
              }

            })

          }
          if (infoName == "axi_id") {
            const indexEncontrado = this.inputs.findIndex((elemento) => elemento.type === 'doubleselect');
            this.loadDataDoubleSelect(this.Form.get(infoName).value, indexEncontrado)
            this.valuesSelects.push({ name: infoName, value: value })

          }
          // delete this.infoForm[infoName]; 
        }
        indice++
      }


    }



    // console.warn(this.infoForm)


  }
  ngOnInit() {
    // this._inputs = []
  }


  updateFormValues(newValues: any): void {
    this.Form.patchValue(newValues);
    // this.createFormControls()
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
                case 'doubleselect':
                  i.listitems = n["data"]["result"];
                  this.listItemSelect.push({
                    select: i.formcontrolname,
                    options: i.listitems
                  })

                  break
                  break;
                case 'checkbox':
                  i.checkbox = n["data"]["result"];


                  break;
                case 'checkboxdescription':
                  i.checkbox = n["data"]["result"];


                  //   for (const controlName in this.Form.controls) {
                  //     const control = this.Form.get(controlName);
                  //     console.log(`Nombre del control: ${controlName}`);
                  //     console.error(`Valor del control: ${control.value}`);
                  //     // Puedes imprimir más propiedades del control según tus necesidades.
                  // }
                  break;
              }
            },
            complete: () => {
              switch (i.type) {
                case 'select':
                case 'doubleselect':
                  this.autocomplete(index, i.formcontrolname, i.listitems)
                  const valuesIndex = this.valuesSelects.findIndex(e => e.name == i.formcontrolname)
                  if (valuesIndex > -1) {
                    i.listitems.forEach(e => {
                      if (e.value == this.valuesSelects[valuesIndex].value) {
                        this.Form.get(i.formcontrolname).setValue(e.text)
                        this.onSelect(i.formcontrolname, e.value)
                      }
                    })
                  }
                  break;
                case 'checkbox':
                  for (let checkbox of i.checkbox) {
                    // console.warn(checkbox.text + checkbox.value,this.array)
                    this.Form.addControl(checkbox.text + checkbox.value, new FormControl());
                    checkbox.status = false
                    // if (this.array.includes(checkbox.text + checkbox.value)) {
                    //   this.Form.get(checkbox.text + checkbox.value).setValue(true)
                    //   checkbox.status = true
                    //   this.addChecked(i.formcontrolname, checkbox)
                    // }

                  }
                  break;
                case 'checkboxdescription':
                  new Promise((resolve, reject) => {
                    for (let [index, checkbox] of i.checkbox.entries()) {
                      checkbox.status = false
                      this.Form.addControl(checkbox.text + checkbox.value, new FormControl());
                      this.Form.addControl(checkbox.text + checkbox.value + "_description", new FormControl());
                      // if (this.array.includes(checkbox.text + checkbox.value)) {
                      //   this.Form.get(checkbox.text + checkbox.value).setValue(true)
                      //   // console.log(checkbox.text + checkbox.value, this.array)
                      //   checkbox.status = true
                      //   this.addCheckbox(i.formcontrolname, checkbox)

                      // }

                      if (index == i.checkbox.length - 1) {
                        resolve("Resuleto");
                      }
                    }
                  }).then(e => {
                    if (i.urloadata && !i.secondcontrolname) {
                      this.modulesService.data(i.urloadata).subscribe({
                        next: (n) => {

                          switch (i.type) {
                            case 'checkboxdescription':

                              i.itemsdescription = n["data"]["result"]


                              // this.Form.get("").setValue(1);
                              // console.log("entre")

                              break;
                          }

                        },
                        complete: () => {
                          switch (i.type) {
                            case 'checkboxdescription':
                              for (let checkbox of i.checkbox) {
                                checkbox.status = true;
                                // if (this.array.includes(checkbox.text + checkbox.value)) {
                                //   const index = this.array.indexOf(checkbox.text + checkbox.value + "_description");
                                //   this.Form.get(checkbox.text + checkbox.value + "_description").setValue(parseInt(this.array[index + 1]))
                                //   checkbox.status = false;
                                //   this.onSelectDescriptionChange(i.formcontrolname, checkbox, parseInt(this.array[index + 1]))
                                //   // this.objects.push({ "groupName": checkbox.text, "value": checkbox.value, "option": true, "origin_id": parseInt(this.array[index +1]) })
                                // }
                                // else {
                                //   console.error
                                // }

                              }
                              break;
                          }
                        }
                      });


                    }
                  })


                  break;

              }
            }


          })
        }


        if (i.event) {
          this.addEvent(i.formcontrolname)
        }

        if (i.type !== 'checkbox' && i.type !== 'checkboxdescription' && i.type !== 'email') {
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
          this.Form.addControl(i.formcontrolname, new FormControl(i.value ? i.value : '', [Validators.required, Validators.email]));

        }



      }

    }

  }
  addEvent(formcontrolName) {
    const element = document.querySelector(`[ng-reflect-name="${formcontrolName}"]`);
    // console.log(element)
  }

  onSubmit() {
    let stop = false
    let contenidoHtml = `
    <h2>Errores del Formulario</h2>
    `
    let html = ''
    const optionNoSelected = []
    const FormValues = {}; // Inicializamos como un objeto vacío
    this.inputs.forEach(e => {
      let exist = false
     if (e.type === 'file') {
    const reader = new FileReader();
    const imageArray = [];

    // Leer y convertir cada archivo en base64
    const formData = new FormData();

      for (const file of e.files) {
          formData.append(file.name, file);
      }
    

    this.Form.addControl(e.formcontrolname, new FormControl());
    this.Form.get(e.formcontrolname).setValue(formData);
   
}




      if (e.type == "checkboxdescription") {
        html += `
        <div class="alert alert-warning" role="alert">

          <ul class="list-group">
          <li class="list-group-item active" aria-current="true">${e.label} no contienen una descripcion y estan seleccionadas</li>

  
          `
        e.checkbox.forEach(c => {
          if (this.Form.controls.hasOwnProperty(e.formcontrolname) && !c.status) {
            const control = this.Form.get(e.formcontrolname);
            if (control && control.value) {
              console.log("entramos", control.value)

              const isExistSelection = control.value.find(value => {
                return value.groupName === c.text
              });

              if (!isExistSelection) {
                exist = true
                html += `
                   <li class="list-group-item text-start ">                   
                    ${c.text} 
                  </li>
                `;
                // Abre el cuadro de diálogo y pasa el contenido HTML como datos



                stop = true
              }
            }
          }

        })
        html += `
          </ul>
          </div>
          `;
        if (exist) {
          contenidoHtml += html
          html = ''
        }
      }


    })
    if (stop) {
      this.dialog.open(HtmlDialogComponent, {
        width: '60%',
        maxHeight: '600px',
        data: { contenidoHtml },
      });
      return
    }

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
      else {
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
    this.selects = []
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
        this.Form.get(check.text + check.value + "_description").setValue(true)
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

  updateChecked(name, check, control, i, index) {
    this.inputs[i].checkbox[index].status = true
    if (!this.Form.get(name)) {
      this.Form.get(control).setValue(true)
      this.Form.addControl(name, new FormControl());
      this.Form.get(name).setValue([{ "groupName": check.text, "value": check.value, "option": true }])
    }
    else {
      const currentArray = this.Form.get(name).value;
      let newArray = []
      newArray.push(...currentArray)
      this.Form.get(control).setValue(true)

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
    }
  }

  addChecked(name, check) {

    if (!this.Form.get(name)) {
      this.Form.addControl(name, new FormControl());
      this.Form.get(name).setValue([{ "groupName": check.text, "value": check.value, "option": true }])
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
  onOptionSelected(event, listitems) {

  }
  onSelectDescriptionChange(name, check, event: any): void {
    check.status = false
    const selectedValue = event;
    // console.log("OBJECTO", object)
    const uniqueValues = new Set();
    let object = null
    const control = this.Form.get(name);

    if (!control.value) {
      this.Form.get(name).setValue([])
      object = this.Form.get(name).value;
    }
    else {
      object = this.Form.get(name).value;

    }
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
    const url = this.inputs[index].urloadata
    this.modulesService.data(`${url}/${selectValue}`).subscribe({
      next: (n) => {
        this.inputs[index].secondlistitems = n["data"]["result"]
        if (value) {
          this.inputs[index].secondlistitems.forEach(e => {
            if (value == e.value) {

              this.Form.get(this.inputs[index].secondcontrolname).setValue(e.text)
            }
          })
        }
      },
      error: (e) => {

      }
    });

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
          else {
            this.Toast.fire({
              position: 'center',
              icon: 'success',
              title: "Ingresa la colonia",
            });
          }

        }, 500)
      },
      error: (e) => {
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
  onSelect(name, id) {
    const exist = this.selects.filter(e => e.name == name)
    if (exist.length > 0)
      this.selects = this.selects.filter(e => e.name != name)
    this.selects.push({
      [name]: id
    })
  }
  filesSelect(event, index) {
    if (this.inputs[index].fileCont>=5) {
      this.Toast.fire({
        position: 'top-end',
        icon: 'warning',
        title: `
        Has excedido el limite de archivos
        `,
      });
      return
    }
    this.inputs[index].files.push(...event.addedFiles)
    this.inputs[index].fileCont = this.inputs[index].files.length
    
    // this.files.push(...event.addedFiles);
  }

  onRemove(event, index) {
    
    this.inputs[index].files.splice(this.inputs[index].files.indexOf(event), 1)
    this.inputs[index].fileCont = this.inputs[index].files.length

    // this.files.splice(this.files.indexOf(event), 1);
  }
  autocomplete(index, myControl, listitems) {

    const textArray: string[] = Object.values(listitems).map(item => item['text']);
    this.Form.get(myControl).valueChanges.subscribe((newValue) => {
      this.listItemSelect.forEach(it => {
        if (it['select'] == myControl) {
          this.inputs[index].listitems = it['options']
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



@Component({
  template: `
  <div class="dialog-container alert alert-warning">
    <div class="content" [innerHTML]="data.contenidoHtml"></div>
    <!-- <button type="button" class="btn btn-primary close-button" (click)="closeDialog()">Cerrar</button> -->

  </div>
`,
  styles: [`
 .dialog-container {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  background: white;
  text-align: center;
  height: 100%; /* Permite que el contenido determine la altura */
}


.close-button {
      position:fixed;
      bottom:0;
      right:0;
      margin:1em;
    }

  .content {
    margin: auto;
  }
`]
})
export class HtmlDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<HtmlDialogComponent>
  ) { }

  closeDialog() {
    this.dialogRef.close();
  }
}