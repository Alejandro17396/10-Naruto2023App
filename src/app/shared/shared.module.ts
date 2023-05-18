import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SliderComponent } from './slider/slider.component';
import { StringTamPipe } from './pipes/string-tam.pipe';



@NgModule({
  declarations: [
    MenuComponent,
    SliderComponent,
    StringTamPipe
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports:[
    MenuComponent,
    SliderComponent,
    StringTamPipe
  ]
})
export class SharedModule { }
