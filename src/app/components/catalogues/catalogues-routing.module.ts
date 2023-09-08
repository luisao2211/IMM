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
import { OriginsComponent } from './origins/origins.component';
import { DisabilitiesComponent } from './disabilities/disabilities.component';
import { HouseholdsComponent } from './households/households.component';
import { AdicctionsComponent } from './adicctions/adicctions.component';
import { TypeviolenceComponent } from './typeviolence/typeviolence.component';
import { FieldviolenceComponent } from './fieldviolence/fieldviolence.component';
import { LoweffectComponent } from './loweffect/loweffect.component';
import { ServicesreferenceComponent } from './servicesreference/servicesreference.component';
import { AxisComponent } from './axis/axis.component';
import { AxisprogramsComponent } from './axisprograms/axisprograms.component';
import { StatusComponent } from './status/status.component';
import { MotiveComponent } from './motive/motive.component';
import { ProblemsComponent } from './problems/problems.component';

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
      {path: 'origenes',component: OriginsComponent},
      {path: 'discapacidades',component: DisabilitiesComponent},
      {path: 'viviendas',component: HouseholdsComponent},
      {path: 'adicciones',component: AdicctionsComponent},
      {path: 'tipoviolencia',component: TypeviolenceComponent},
      {path: 'ambitoviolencia',component: FieldviolenceComponent},
      {path: 'efectos',component: LoweffectComponent},
      {path: 'serviciosreferencia',component: ServicesreferenceComponent},
      {path: 'eje',component: AxisComponent},
      {path: 'programas',component: AxisprogramsComponent},
      {path: 'status',component: StatusComponent},
      {path: 'problemas',component: ProblemsComponent},
      {path: 'motivos',component: MotiveComponent},


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
