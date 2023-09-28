import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Module1Component } from './mainmodulepage/module1/module1.component';
import { Module2Component } from './mainmodulepage/module2/module2.component';
import { Module3Component } from './mainmodulepage/module3/module3.component';

const routes : Routes =[
{path:'formulariomodulo1',component:Module1Component},
{path:'formulariomodulo2',component:Module2Component},
{path:'formulariomodulo3',component:Module3Component}

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
 
})
export class ModulesRoutingModule { }
