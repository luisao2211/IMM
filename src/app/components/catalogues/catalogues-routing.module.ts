import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaingenderComponent } from './maingender/maingender.component';
import { ColoniesComponent } from './colonies/colonies.component';
import { StatecivilComponent } from './statecivil/statecivil.component';
import { ActivitiesComponent } from './activities/activities.component';
import { WorkplacesComponent } from './workplaces/workplaces.component';
import { MedicalserviceComponent } from './medicalservice/medicalservice.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { DiseasesComponent } from './diseases/diseases.component';

const routes : Routes = [
  {
    path: '',
    children: [
      {path: 'genero',component: MaingenderComponent},
      {path: 'colonias',component: ColoniesComponent},
      {path: 'estadosciviles',component: StatecivilComponent},
      {path: 'actividades',component: ActivitiesComponent},
      {path: 'trabajos',component: WorkplacesComponent},
      {path: 'serviciosmedicos',component: MedicalserviceComponent},
      {path: 'formacioneducativa',component: TrainingsComponent},
      {path: 'enfermedades',component: DiseasesComponent},


    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],

})
export class CataloguesRoutingModule { }
