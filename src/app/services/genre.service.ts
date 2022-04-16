import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IApiResponse } from '../models/api-response.model';
import { IGenre } from '../models/genre';

@Injectable({ providedIn: 'root' })
export class GenreService {
  private genres$: Observable<IGenre[]>;
  constructor(private http: HttpClient) {}

  public getGenres(): Observable<IGenre[]> {
    if (!this.genres$) {
      this.genres$ = this.http.get<IApiResponse<IGenre[]>>(`${environment.bookApiEndPoint}/Genre`).pipe(
        map((g) => g.content),
        shareReplay(1)
      );
    }
    return this.genres$;
  }
}
