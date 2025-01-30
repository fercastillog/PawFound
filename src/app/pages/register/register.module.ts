import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterPage } from './register.page';
import { RegisterPageRoutingModule } from './register-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterPageRoutingModule
  ],
  declarations: [RegisterPage]  // Asegúrate de que RegisterPage esté en las declaraciones
})
export class RegisterPageModule {}
