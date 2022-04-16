import { HttpClient } from '@angular/common/http';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IApiResponse } from '../models/api-response.model';
import { Preferences } from '../models/preferences';
import { LocaleProvider } from './locale-provider';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  private renderer: Renderer2;
  private _preferencesCahe: Observable<IApiResponse<Preferences>> | undefined;

  constructor(
    private http: HttpClient,
    private localeProvider: LocaleProvider,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  public getPreferences(): Observable<IApiResponse<Preferences>> {
    if (!this._preferencesCahe) {
      this._preferencesCahe = this.http
        .get<IApiResponse<Preferences>>(`${environment.authApiEndPoint}/preferences`)
        .pipe(shareReplay(1));
    }

    return this._preferencesCahe;
  }

  public clearPreferenceCache(): void {
    this._preferencesCahe = undefined;
  }

  public async changeUserLocale(): Promise<void> {
    await this.getPreferences()
      .pipe(tap((p) => this.localeProvider.changeLocale(p.content.locale)))
      .toPromise();
  }

  public setDarkTheme(enableDarkTheme: boolean) {
    return this.http.post(`${environment.authApiEndPoint}/preferences/setDarkTheme`, { enableDarkTheme });
  }

  public setLocale(locale: string) {
    return this.http.post(`${environment.authApiEndPoint}/preferences/setLocale`, { locale });
  }

  public toggleTheme(isDarkMode: boolean): void {
    this.renderer.setAttribute(document.documentElement, 'data-color-scheme', isDarkMode ? 'dark' : 'light');
  }
}
