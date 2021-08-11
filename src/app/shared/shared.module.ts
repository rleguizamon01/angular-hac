import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingCardComponent } from './listing-card/listing-card.component';
import { ZorroModule } from '../zorro/zorro.module';
import { TopBarComponent } from './top-bar/top-bar.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    ZorroModule,
    RouterModule
  ],
  declarations: [
    ListingCardComponent,
    TopBarComponent
  ],
  exports: [
    ListingCardComponent,
    TopBarComponent
  ]
})
export class SharedModule { }
