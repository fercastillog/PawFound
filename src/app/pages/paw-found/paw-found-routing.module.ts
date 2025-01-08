import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PawFoundPage } from './paw-found.page';

const routes: Routes = [
  {
    path: '',
    component: PawFoundPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PawFoundPageRoutingModule {}
