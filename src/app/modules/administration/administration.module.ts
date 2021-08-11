import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationRoutingModule } from './administration-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { ZorroModule } from 'src/app/zorro/zorro.module';
import { ApiService } from 'src/app/core/services/api.service';
import { PropertySurveyModule } from './property-survey/property-survey.module';

@NgModule({
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    ZorroModule,
    PropertySurveyModule
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    LayoutComponent
  ],
  providers: [
    ApiService
  ]
})
export class AdministrationModule { }
