import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Genre } from '../models/genre';

@Injectable({ providedIn: 'root' })
export class GenreService {
  private genresObservableCache$: Observable<Genre[]>;
  constructor(private http: HttpClient) {}

  public getGenres(): Observable<Genre[]> {
    if (!this.genresObservableCache$) {
      this.genresObservableCache$ = this.http.get<ApiResponse<Genre[]>>(`${environment.bookApiEndPoint}/Genre`).pipe(
        map((g) => g.content),
        shareReplay(1)
      );
    }
    return this.genresObservableCache$;
  }
}
