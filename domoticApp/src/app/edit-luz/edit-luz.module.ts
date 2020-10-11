import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditLuzPageRoutingModule } from './edit-luz-routing.module';

import { EditLuzPage } from './edit-luz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditLuzPageRoutingModule
  ],
  declarations: [EditLuzPage]
})
export class EditLuzPageModule {}
