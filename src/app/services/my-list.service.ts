import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiDataResponse } from '../models/api-data-response.model';
import { IMyList } from '../models/my-list';

@Injectable({
  providedIn: 'root'
})
export class MyListService {
  constructor(private http: HttpClient) {}

  public getMyList(): Observable<IApiDataResponse<IMyList[]>> {
    return this.http.get<IApiDataResponse<IMyList[]>>(`${environment.bookApiEndPoint}/MyList`);
  }

  public addToMyList(id: string) {
    return this.http.post(`${environment.bookApiEndPoint}/MyList?itemId=${id}`, {});
  }

  public removeFromMyList(id: string) {
    return this.http.delete(`${environment.bookApiEndPoint}/MyList/?itemId=${id}`);
  }

  public checkItemInMyList(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.bookApiEndPoint}/MyList/checckiteminmylist/?itemId=${id}`);
  }
}
