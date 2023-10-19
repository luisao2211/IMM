import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesService } from './services/modules.service';
import { Module1Component } from './mainmodulepage/module1/module1.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgxDropzoneModule } from 'ngx-dropzone';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './forms/form/form.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import { Module2Component } from './mainmodulepage/module2/module2.component';
import { Module3Component } from './mainmodulepage/module3/module3.component';
import { TableComponent } from './table/table.component';
import { PdfComponent } from './pdf/pdf.component';
@NgModule({
  declarations: [
    Module1Component,
    FormComponent,
    Module2Component,
    Module3Component,
    TableComponent,
    PdfComponent
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    MatIconModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    MatAutocompleteModule,
    NgxDropzoneModule,
    MatProgressBarModule
  ],
  providers:[
    ModulesService
  ]
})
export class Module1Module { }
