import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportpetPageRoutingModule } from './reportpet-routing.module';

import { ReportpetPage } from './reportpet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ReportpetPageRoutingModule
  ],
  declarations: [ReportpetPage]
})
export class ReportpetPageModule {}
