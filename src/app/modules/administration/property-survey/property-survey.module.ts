import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PropertySurveyListComponent } from './property-survey-list/property-survey-list.component';
import { ZorroModule } from 'src/app/zorro/zorro.module';
import { PropertySurveyRoutingModule } from './property-survey-routing.module';
import { PropertySurveyDetailComponent } from './property-survey-detail/property-survey-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApiService } from 'src/app/core/services/api.service';
import { PropertySurveyEditComponent } from './property-survey-edit/property-survey-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertySurveyCreateComponent } from './property-survey-create/property-survey-create.component';


@NgModule({
  imports: [
    PropertySurveyRoutingModule,
    CommonModule,
    ZorroModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    PropertySurveyListComponent,
    PropertySurveyDetailComponent,
    PropertySurveyEditComponent,
    PropertySurveyCreateComponent
  ],
  providers: [
    ApiService,
    DatePipe
  ]
})
export class PropertySurveyModule { }
