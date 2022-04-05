import { Pipe, PipeTransform } from '@angular/core';
import { LocaleService } from '../services/locale.service';

@Pipe({
  name: 'appLocale',
  pure: false
})
export class AppLocalePipe implements PipeTransform {
  private cachedData: any = {};

  constructor(private localeService: LocaleService) {}

  public transform(key: string, ...args: unknown[]): string {
    const name = key + JSON.stringify(args);

    if (!(name in this.cachedData)) {
      this.localeService.get(key, args).subscribe((res) => (this.cachedData[name] = res));
    }

    return this.cachedData[name];
  }
}
