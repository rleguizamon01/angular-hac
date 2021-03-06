import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { LayoutComponent } from './layout/layout.component';

const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'property-survey',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'property-survey',
        loadChildren: () => import('./property-survey/property-survey.module').then(m => m.PropertySurveyModule)
      }
    ]
  },
  { 
    path: '**', 
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdministrationRoutingModule {}
