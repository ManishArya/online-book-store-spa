import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, retry, shareReplay } from 'rxjs/operators';
import { LocaleOption } from '../models/locale-option';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  private localeCache: Observable<string>;
  constructor(private http: HttpClient) {
    this.localeCache = this.getLocaleFile();
  }

  public get(key: string, ...args: any): Observable<string> {
    return this.localeCache.pipe(map((res: any) => this.formattedOutput(res[key] ?? key, args)));
  }

  private getLocaleFile() {
    return this.http.get<string>(`./assets/locales/locale-${'hi'}.json`).pipe(
      catchError(() => of(`./assets/locales/locale-en.json`)),
      retry(1),
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
