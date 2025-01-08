import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PawFoundPageRoutingModule } from './paw-found-routing.module';

import { PawFoundPage } from './paw-found.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PawFoundPageRoutingModule
  ],
  declarations: [PawFoundPage]
})
export class PawFoundPageModule {}
