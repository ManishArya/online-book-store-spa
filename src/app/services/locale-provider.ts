import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocaleProvider {
  private localeChangeSubject: Subject<string> = new Subject<string>();
  public localeChange$ = this.localeChangeSubject.asObservable();
  private _userPreferredLocale = '';
  private readonly _defaultLocale: string = 'en-US';
  private readonly _supportedLocales: readonly string[] = ['en-US', 'en', 'hi'];

  public getDefaultLocale(): Observable<string> {
    return of(this._defaultLocale);
  }

  public changeLocale(locale: string): void {
    this._userPreferredLocale = locale;
    this.localeChangeSubject.next(locale);
  }

  public resetToBrowserSettingsLocale(): void {
    this.changeLocale('');
  }

  public getCurrentOrDefaultLocale(): Observable<string> {
    let locale: string | undefined;

    if (this._userPreferredLocale) {
      locale = this._supportedLocales.find((l) => l === this._userPreferredLocale);
    } else {
      const currentBrowserLocales = navigator.languages;
      locale = currentBrowserLocales.find((c) => this._supportedLocales.includes(c));
    }

    if (!locale) {
      console.warn(
        `we are not supporting this locale ${
          this._userPreferredLocale || navigator.language
        } switching to default locale ${this._defaultLocale}`
      );
    }
    return of(locale ?? this._defaultLocale);
  }
}
