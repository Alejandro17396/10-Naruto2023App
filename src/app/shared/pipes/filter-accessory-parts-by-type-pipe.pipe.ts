import { Pipe, PipeTransform } from '@angular/core';
import { Parte } from 'src/app/accesories/interfaces/accesories.interfaces';

@Pipe({
  name: 'filterAccessoryPartsByTypePipe'
})
export class FilterAccessoryPartsByTypePipePipe implements PipeTransform {

  transform(allParts: Parte[], type: string): Parte[] {
    return allParts.filter(parte => parte.tipo === type);
  }

}
