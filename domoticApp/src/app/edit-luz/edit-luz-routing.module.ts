import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditLuzPage } from './edit-luz.page';

const routes: Routes = [
  {
    path: '',
    component: EditLuzPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditLuzPageRoutingModule {}
