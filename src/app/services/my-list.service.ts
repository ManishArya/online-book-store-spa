import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiResponse } from '../models/api-response.model';
import { IMyList } from '../models/my-list';

@Injectable({
  providedIn: 'root'
})
export class MyListService {
  private myListCountsRefreshSubject = new Subject<number>();
  public myListCountsRefresh$ = this.myListCountsRefreshSubject.asObservable();

  constructor(private http: HttpClient) {}

  public getMyList(): Observable<IApiResponse<IMyList[]>> {
    return this.http.get<IApiResponse<IMyList[]>>(`${environment.bookApiEndPoint}/MyList`);
  }

  public addToMyList(id: string): Observable<IApiResponse<string>> {
    return this.http.post<IApiResponse<string>>(`${environment.bookApiEndPoint}/MyList?itemId=${id}`, {});
  }

  public removeFromMyList(id: string): Observable<IApiResponse<string>> {
    return this.http.delete<IApiResponse<string>>(`${environment.bookApiEndPoint}/MyList/?itemId=${id}`);
  }

  public checkItemInMyList(id: string): Observable<IApiResponse<boolean>> {
    return this.http.get<IApiResponse<boolean>>(
      `${environment.bookApiEndPoint}/MyList/checckiteminmylist/?itemId=${id}`
    );
  }

  public getListCounts(): Observable<IApiResponse<number>> {
    return this.http.get<IApiResponse<number>>(`${environment.bookApiEndPoint}/MyList/counts`);
  }

  public refreshListCounts(count: number): void {
    this.myListCountsRefreshSubject.next(count);
  }
}
