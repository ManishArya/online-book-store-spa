import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';
import { LocaleOption } from '../models/locale-option';
import { LocaleProvider } from './locale-provider';

interface Resource {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  private localeCache: Observable<Resource>;
  constructor(private http: HttpClient, private localeProvider: LocaleProvider) {
    this.localeCache = this.getLocaleFile();
  }

  public get(key: string, ...args: any): Observable<string> {
    return this.localeCache.pipe(
      map((res) => {
        return res[key] ? this.formattedOutput(res[key], args) : key;
      })
    );
  }

  private getLocaleFile() {
    return this.localeProvider.getCurrentOrDefaultLocale().pipe(
      switchMap((l) => {
        return this.http
          .get<Resource>(`./assets/locales/locale-${l}.json`)
          .pipe(catchError(() => this.http.get<Resource>('./assets/locales/locale-en.json')));
      }),
      shareReplay(1)
    );
  }

  private formattedOutput(key: string, args: any) {
    if (args?.length !== 0) {
      return key.replace(/({(\d+)})+/g, (match, p1, p2) => {
        return args[0][p2] ?? match;
      });
    }

    return key;
  }

  public configureLocale(localeOption: LocaleOption): LocaleOption {
    return {
      defaultLocale: localeOption?.defaultLocale || 'en',
      supportedLanguages: localeOption.supportedLanguages || ['en', 'hi']
    };
  }
}
