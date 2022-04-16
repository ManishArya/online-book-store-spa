import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appCommaSeparator'
})
export class AppCommaSeparatorPipe implements PipeTransform {
  transform(value: string[], ...args: any[]): string {
    return value?.join(' , ') ?? '';
  }
}
