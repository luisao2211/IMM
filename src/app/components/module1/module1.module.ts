import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Module1RoutingModule } from './module1-routing.module';
import { Module1Service } from './services/module1.service';
import { Module1Component } from './mainmodulepage/module1/module1.component';
import { MovelementsComponent } from './forms/movelements/movelements.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './forms/form/form.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';

import {MatNativeDateModule} from '@angular/material/core';
@NgModule({
  declarations: [
    Module1Component,
    MovelementsComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    Module1RoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatExpansionModule
  ],
  providers:[
    Module1Service
  ]
})
export class Module1Module { }
