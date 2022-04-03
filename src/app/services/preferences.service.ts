import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IApiResponse } from '../models/api-response.model';
import { Preferences } from '../models/preferences';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  constructor(private http: HttpClient) {}

  public getPreferences(): Observable<IApiResponse<Preferences>> {
    return this.http.get<IApiResponse<Preferences>>(`${environment.authApiEndPoint}/preferences`).pipe(shareReplay(1));
  }

  public setDarkTheme(enableDarkTheme: boolean) {
    return this.http.post(`${environment.authApiEndPoint}/preferences/setDarkTheme`, { enableDarkTheme });
  }

  public setLocale(locale: string) {
    return this.http.post(`${environment.authApiEndPoint}/preferences/setLocale`, { locale });
  }
}
