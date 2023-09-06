import { OriginsComponent } from './origins/origins.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaingenderComponent } from './maingender/maingender.component'; // Import your component here
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { DataTablesModule } from "angular-datatables";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CataloguesRoutingModule } from './catalogues-routing.module';
import { GenderService } from './maingender/apiservice/gender.service';
import { ColoniesComponent } from './colonies/colonies.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import { ColoniesService } from './colonies/apiservice/colonies.service';
import { StatecivilComponent } from './statecivil/statecivil.component';
import { CivilStateService } from './statecivil/apiservice/civilstate.service';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivitiesService } from './activities/apiservice/activies.service';
import { WorkplacesComponent } from './workplaces/workplaces.component';
import { WorkPlacesService } from './workplaces/apiservice/workplaces.service';
import { MedicalserviceComponent } from './medicalservice/medicalservice.component';
import { MedicalServiceService } from './medicalservice/apiservice/medicalservices.service';
import { TrainingsComponent } from './trainings/trainings.component';
import { TrainingService } from './trainings/apiservice/trainings.service';
import { DiseasesComponent } from './diseases/diseases.component';
import { DiseaseService } from './diseases/apiservice/diseases.service';
import { OriginService } from './origins/apiservice/origins.service';
import { DisabilitiesComponent } from './disabilities/disabilities.component';
import { DisabilitesService } from './disabilities/apiservice/disabilities.service';
import { HouseholdsComponent } from './households/households.component';
import { HouseHoldService } from './households/apiservice/households.service';
import { AdicctionsComponent } from './adicctions/adicctions.component';
import { AdicctionsService } from './adicctions/apiservice/adicctions.service';
import { TypeviolenceComponent } from './typeviolence/typeviolence.component';
import { TypeViolenceService } from './typeviolence/apiservice/typeviolence.service';
import { FieldviolenceComponent } from './fieldviolence/fieldviolence.component';
import { FieldViolenceService } from './fieldviolence/apiservice/fieldviolence.service';

@NgModule({
  declarations: [
    MaingenderComponent,
    ColoniesComponent,
    StatecivilComponent,
    ActivitiesComponent,
    WorkplacesComponent,
    MedicalserviceComponent,
    TrainingsComponent,
    DiseasesComponent,
    OriginsComponent,
    DisabilitiesComponent,
    HouseholdsComponent,
    AdicctionsComponent,
    TypeviolenceComponent,
    FieldviolenceComponent, // Add your component here
  ],
  imports: [
    CommonModule,
    CataloguesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatOptionModule,
    NgSelectModule,
    MatStepperModule,
    MatSelectModule
  ],
  providers: [
    GenderService,
    ColoniesService,
    CivilStateService,
    ActivitiesService,
    WorkPlacesService,
    MedicalServiceService,
    TrainingService,
    DiseaseService,
    OriginService,
    DisabilitesService,
    HouseHoldService,
    AdicctionsService,
    TypeViolenceService,
    FieldViolenceService,
  ],
})
export class CataloguesModule {}
