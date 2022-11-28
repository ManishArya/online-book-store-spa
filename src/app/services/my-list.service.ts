import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { MyList } from '../models/my-list';

@Injectable({
  providedIn: 'root'
})
export class MyListService {
  private countIncrementSubject = new Subject<number>();
  public countIncrement$ = this.countIncrementSubject.asObservable();
  private countUpdateSubject = new Subject<number>();
  public countUpdate$ = this.countUpdateSubject.asObservable();

  constructor(private http: HttpClient) {}

  public getMyList(): Observable<ApiResponse<MyList[]>> {
    return this.http.get<ApiResponse<MyList[]>>(`${environment.bookApiEndPoint}/MyList`);
  }

  public addToMyList(myList: { bookId: string; quantity?: number }): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${environment.bookApiEndPoint}/MyList`, myList);
  }

  public removeFromMyList(id: string): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${environment.bookApiEndPoint}/MyList`, {
      params: new HttpParams().set('itemId', id)
    });
  }

  public checkItemInMyList(id: string): Observable<ApiResponse<boolean>> {
    return this.http.get<ApiResponse<boolean>>(`${environment.bookApiEndPoint}/MyList/checkitem/?itemId=${id}`);
  }

  public getListCounts(): Observable<ApiResponse<number>> {
    return this.http.get<ApiResponse<number>>(`${environment.bookApiEndPoint}/MyList/counts`);
  }

  public incrementCount(count: number): void {
    this.countIncrementSubject.next(count);
  }

  public updateCount(count: number): void {
    this.countUpdateSubject.next(count);
  }

  public removeAllFromMyList(): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${environment.bookApiEndPoint}/MyList/removeAll`);
  }
}
