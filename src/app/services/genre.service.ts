import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGenre } from '../models/genre';

@Injectable({ providedIn: 'root' })
export class GenreService {
  constructor(private http: HttpClient) {}

  public getGenres(): Observable<IGenre[]> {
    return this.http.get<IGenre[]>(`${environment.bookApiEndPoint}/Genre`);
  }
}
