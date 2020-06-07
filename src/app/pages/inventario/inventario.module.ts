import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { InventarioPage } from './inventario.page';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild([{ path: '', component: InventarioPage }])
  ],
  declarations: [InventarioPage]
})
export class InventarioPageModule {}
