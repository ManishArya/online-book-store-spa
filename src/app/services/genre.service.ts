import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiResponse } from '../models/api-response.model';
import { IGenre } from '../models/genre';

@Injectable({ providedIn: 'root' })
export class GenreService {
  constructor(private http: HttpClient) {}

  public getGenres(): Observable<IApiResponse<IGenre[]>> {
    return this.http.get<IApiResponse<IGenre[]>>(`${environment.bookApiEndPoint}/Genre`);
  }
}
