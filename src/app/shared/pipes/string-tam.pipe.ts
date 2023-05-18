import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringTam'
})
export class StringTamPipe implements PipeTransform {

  transform(cad: string,tam:number, ...args: unknown[]): string {
    if(cad.length<tam){
      return cad;
    }
    return cad.substring(0,tam) + "...";
  }

}
