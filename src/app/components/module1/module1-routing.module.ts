import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Module1Component } from './mainmodulepage/module1/module1.component';

const routes : Routes =[
{
path:'formulario',component:Module1Component
}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
 
})
export class Module1RoutingModule { }
