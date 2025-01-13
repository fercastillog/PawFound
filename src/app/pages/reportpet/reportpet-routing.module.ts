import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportpetPage } from './reportpet.page';

const routes: Routes = [
  {
    path: '',
    component: ReportpetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportpetPageRoutingModule {}
