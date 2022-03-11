import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../models/api-response.model';
import { Preferences } from '../models/preferences';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  constructor(private http: HttpClient) {}

  public getPreferences(): Observable<IApiResponse<Preferences>> {
    return this.http.get<IApiResponse<Preferences>>('');
  }

  public setDarkTheme(enableDarkTheme: boolean) {}
}
