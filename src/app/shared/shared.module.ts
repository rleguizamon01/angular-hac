import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingCardComponent } from './listing-card/listing-card.component';
import { ZorroModule } from '../zorro/zorro.module';
import { TopBarComponent } from './top-bar/top-bar.component';
import { RouterModule } from '@angular/router';
import { HeaderTitleButtonComponent } from './header-title-button/header-title-button.component';


@NgModule({
  imports: [
    CommonModule,
    ZorroModule,
    RouterModule
  ],
  declarations: [
    ListingCardComponent,
    TopBarComponent,
    HeaderTitleButtonComponent
  ],
  exports: [
    ListingCardComponent,
    TopBarComponent,
    HeaderTitleButtonComponent
  ]
})
export class SharedModule { }
