import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer){}

  transform(base64: unknown|undefined|null, name: string, type:string): SafeUrl {

    let urlBase;
    //console.log("soy "+base64);
    switch(type){
      case "ninjaFace":
        urlBase = 'assets/images/ninjas/images/';
        break;
      case "ninjaStats":
        urlBase = 'assets/images/ninjas/info/';
        break;
      case "equipment":
        urlBase = 'assets/images/sets/';
        break;
      case "accesories":
        urlBase = 'assets/images/accesorios/';
        break;
      default:
        return this.sanitizer.bypassSecurityTrustUrl('assets/images/ejemplo.jpg');

    }

    let image ;
    if(base64 == null){
      //console.log("soy null y mi name es "+ name);
      const imageUrl = `${urlBase}${name}.jpg`;
      image = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
      return image;
    }

    if (base64 != null) {
      const imageUrl = 'data:image/jpeg;base64,' + base64;
      image = this.sanitizer.bypassSecurityTrustUrl(imageUrl);

    }
    //console.log("elemento")
    if(!image){
      const imageUrl = `${urlBase}${name}.jpg`;
      image = this.sanitizer.bypassSecurityTrustUrl(imageUrl);

    }

    if(image && !(image.toString().length > 0)){
      image = this.sanitizer.bypassSecurityTrustUrl('assets/images/ejemplo.jpg');

    }

    return image;

  }

  private isImageExists(url: string): boolean {
    const img = new Image();
    img.src = url;
    return img.complete && img.naturalWidth !== 0;
  }

}
