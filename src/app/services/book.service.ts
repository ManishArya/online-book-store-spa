import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiResponse } from '../models/api-response.model';
import { IBook } from '../models/book';

const CONTROLLER_NAME = 'Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private bookListRefreshSubject = new Subject<void>();
  public bookListRefresh$ = this.bookListRefreshSubject.asObservable();

  constructor(private http: HttpClient) {}

  public getBooks(): Observable<IApiResponse<IBook[]>> {
    return this.http.get<IApiResponse<IBook[]>>(`${environment.bookApiEndPoint}/${CONTROLLER_NAME}/list`);
  }

  public getBook(id: string): Observable<IApiResponse<IBook>> {
    return this.http.get<IApiResponse<IBook>>(`${environment.bookApiEndPoint}/${CONTROLLER_NAME}?id=${id}`);
  }

  public addBook(formData: FormData): Observable<IApiResponse<string>> {
    return this.http.post<IApiResponse<string>>(`${environment.bookApiEndPoint}/${CONTROLLER_NAME}`, formData);
  }

  public removeBook(id: string): Observable<IApiResponse<string>> {
    return this.http.delete<IApiResponse<string>>(`${environment.bookApiEndPoint}/${CONTROLLER_NAME}?id=${id}`);
  }

  public refreshBookList(): void {
    this.bookListRefreshSubject.next();
  }
}
