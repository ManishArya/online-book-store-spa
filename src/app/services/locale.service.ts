import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';
import { LocaleProvider } from './locale-provider';

interface Resource {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  private obsCache: Observable<Resource> | undefined;
  private localeCache: { [key: string]: Observable<Resource> } = {};
  constructor(private http: HttpClient, private localeProvider: LocaleProvider) {
    this.localeProvider.localeChange$.subscribe(() => (this.obsCache = undefined));
  }

  public get(key: string, ...args: any): Observable<string> {
    return this.getLocaleFile().pipe(
      map((res) => {
        return res[key] ? this.formatMessage(res[key], args) : key;
      })
    );
  }

  private getLocaleFile() {
    if (!this.obsCache) {
      this.obsCache = this.localeProvider.getCurrentOrDefaultLocale().pipe(
        switchMap((l) => {
          console.log(l);
          if (!this.localeCache?.[l]) {
            this.localeCache[l] = this.http.get<Resource>(`./assets/locales/locale-${l}.json`).pipe(shareReplay(1));
          }
          return this.localeCache?.[l];
        }),
        catchError((err) => {
          return of({} as Resource);
        }),
        shareReplay(1)
      );
    }
    return this.obsCache;
  }

  private formatMessage(key: string, args: any) {
    if (args?.length !== 0) {
      return key.replace(/{(\d+)}+/g, (match, p1) => {
        return args[0][p1] ?? match;
      });
    }

    return key;
  }
}
