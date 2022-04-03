import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocaleOption } from '../models/locale-option';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  constructor(private http: HttpClient) {}

  public get(key: string, ...args: any): Observable<string> {
    return this.http
      .get<string>(`./assets/locales/locale-${navigator.language}.json`)
      .pipe(map((res: any) => this.formattedOutput(res[key] ?? key, ...args)));
  }

  private formattedOutput(key: string, ...args: any) {
    if (args?.length !== 0) {
      let count = 0;
      return key.replace(/[{\d}]+)/g, (match, p1, p2, offset) => {
        return args[0][count++];
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
