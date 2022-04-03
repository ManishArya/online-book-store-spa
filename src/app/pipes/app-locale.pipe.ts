import { Pipe, PipeTransform } from '@angular/core';
import { LocaleService } from '../services/locale.service';

@Pipe({
  name: 'appLocale',
  pure: false
})
export class AppLocalePipe implements PipeTransform {
  private localizedData: string;
  private cachedKey: string;

  constructor(private localeService: LocaleService) {}

  public transform(key: string, ...args: unknown[]): string {
    if (this.cachedKey !== key) {
      this.cachedKey = key;
      this.localeService.get(key, args).subscribe((res) => (this.localizedData = res));
    }

    return this.localizedData;
  }
}
