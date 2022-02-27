import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IApiResponse } from '../models/api-response.model';
import { IGenre } from '../models/genre';

@Injectable({ providedIn: 'root' })
export class GenreService {
  private genres: IGenre[];
  constructor(private http: HttpClient) {}

  public getGenres(): Observable<IGenre[]> {
    if (this.genres) {
      return of(this.genres);
    }
    return this.http.get<IApiResponse<IGenre[]>>(`${environment.bookApiEndPoint}/Genre`).pipe(
      map((g) => {
        this.genres = g.content;
        return this.genres;
      })
    );
  }
}
