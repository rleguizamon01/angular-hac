import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../../page-not-found/page-not-found.component';
import { PropertySurveyCreateComponent } from './property-survey-create/property-survey-create.component';
import { PropertySurveyDetailComponent } from './property-survey-detail/property-survey-detail.component';
import { PropertySurveyEditComponent } from './property-survey-edit/property-survey-edit.component';
import { PropertySurveyListComponent } from './property-survey-list/property-survey-list.component';

const propertySurveyRoutes: Routes = [
  {
    path: '',
    component: PropertySurveyListComponent,
    pathMatch: 'full'
  },
  {
    path: 'create',
    component: PropertySurveyCreateComponent,
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: PropertySurveyDetailComponent,
    pathMatch: 'full'
  },
  {
    path: ':id/edit',
    component: PropertySurveyEditComponent,
    pathMatch: 'full'
  },
  { 
    path: '**', 
    component: PageNotFoundComponent
  }
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
