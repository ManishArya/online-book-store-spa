import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, shareReplay, switchMap, takeUntil } from 'rxjs/operators';
import { LocaleProvider } from './locale-provider';

interface Resource {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocaleService implements OnDestroy {
  private resourceCache: Observable<Resource> | undefined;
  private localeCache: { [key: string]: Observable<Resource> } = {};
  private destory$ = new Subject<void>();

  constructor(private http: HttpClient, private localeProvider: LocaleProvider) {
    this.localeProvider.localeChange$.pipe(takeUntil(this.destory$)).subscribe(() => (this.resourceCache = undefined));
  }

  public get(key: string, ...args: any): Observable<string> {
    return this.getResource(key, args).pipe(
      map((res) => {
        return res[key] ? this.formatMessage(res[key], args) : key;
      })
    );
  }

  public getStrings(keys: { [key: string]: string }) {
    // TODO: To Be implement
  }

  public ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

  private getResource(key: string, args: any[]) {
    if (!this.resourceCache) {
      this.resourceCache = this.localeProvider.getCurrentOrDefaultLocale().pipe(
        switchMap((l) => {
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

    return this.resourceCache;
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
