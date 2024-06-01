import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';

import { SliderComponent } from './slider/slider.component';
import { StringTamPipe } from './pipes/string-tam.pipe';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ImageUrlPipe } from './pipes/image-url.pipe';
import { FallBackImgDirective } from './directives/fall-back-img.directive';
import { FilterAccessoryPartsByTypePipePipe } from './pipes/filter-accessory-parts-by-type-pipe.pipe';



@NgModule({
  declarations: [
    MenuComponent,
    SliderComponent,
    StringTamPipe,
    ImageUrlPipe,
    FallBackImgDirective,
    FilterAccessoryPartsByTypePipePipe
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports:[
    MenuComponent,
    SliderComponent,
    StringTamPipe,
    ImageUrlPipe,
    FilterAccessoryPartsByTypePipePipe,
    FallBackImgDirective
  ]
})
export class SharedModule { }
