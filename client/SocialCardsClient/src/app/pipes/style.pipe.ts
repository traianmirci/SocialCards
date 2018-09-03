import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl} from '@angular/platform-browser';


@Pipe({
  name: 'style'
})
export class StylePipe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) {

  }
  
  public   transform(url) {
    return this.sanitizer.bypassSecurityTrustStyle('url(' + url+ ')');
    
  }

}
