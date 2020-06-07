import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';

@NgModule({
    declarations: [
        MenuComponent
    ],
    exports: [
        MenuComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ]
})
export class ComponentsModule { }
