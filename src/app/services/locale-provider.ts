import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocaleProvider {
  private readonly _defaultLocale: string = 'en-US';
  private readonly _supportedLocales: readonly string[] = ['en-US', 'en', 'hi'];

  public getDefaultLocale(): Observable<string> {
    return of(this._defaultLocale);
  }

  public getCurrentOrDefaultLocale(): Observable<string> {
    const currentBrowserLocales = navigator.languages;

    const locale = currentBrowserLocales.find((c) => this._supportedLocales.includes(c)) ?? this._defaultLocale;

    return of(locale);
  }
}
