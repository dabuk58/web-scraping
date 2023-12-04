import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domPipe'
})
export class DomPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): any {
    const parser = new DOMParser();
    const doc = parser.parseFromString(value, 'text/html');
    const formElement = doc.body.querySelector('form');

    if (formElement) {
      const formHtml = formElement.outerHTML;
      return this.sanitizer.bypassSecurityTrustHtml(formHtml);
    }

    return value;
  }
}
