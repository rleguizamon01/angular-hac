import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertySurveyCreateComponent } from './property-survey-create/property-survey-create.component';
import { PropertySurveyDetailComponent } from './property-survey-detail/property-survey-detail.component';
import { PropertySurveyEditComponent } from './property-survey-edit/property-survey-edit.component';
import { PropertySurveyListComponent } from './property-survey-list/property-survey-list.component';

const propertySurveyRoutes: Routes = [
  {
    path: '',
    component: PropertySurveyListComponent
  },
  {
    path: 'create',
    component: PropertySurveyCreateComponent
  },
  {
    path: ':id',
    component: PropertySurveyDetailComponent
  },
  {
    path: ':id/edit',
    component: PropertySurveyEditComponent
  },
  
];

@NgModule({
  imports: [
    RouterModule.forChild(propertySurveyRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PropertySurveyRoutingModule {}
