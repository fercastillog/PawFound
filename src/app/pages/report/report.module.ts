import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportPageRoutingModule } from './report-routing.module';

import { ReportPage } from './report.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ReportPage]
})
export class ReportPageModule {}
