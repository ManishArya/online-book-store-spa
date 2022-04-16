import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { LocaleProvider } from '../services/locale-provider';
import { LocaleService } from '../services/locale.service';

@Pipe({
  name: 'appLocale',
  pure: false
})
export class AppLocalePipe implements PipeTransform, OnDestroy {
  private cachedData: any = {};
  private destory$ = new Subject<void>();

  constructor(private localeService: LocaleService, private localeProvider: LocaleProvider) {
    this.localeProvider.localeChange$
      .pipe(distinctUntilChanged(), takeUntil(this.destory$))
      .subscribe(() => (this.cachedData = {}));
  }

  public transform(key: string, ...args: any[]): string {
    const name = key + JSON.stringify(args);

    if (!(name in this.cachedData)) {
      this.localeService.get(key, args).subscribe((res) => (this.cachedData[name] = res));
    }

    return this.cachedData[name];
  }

  public ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }
}
