import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Book } from '../models/book';

const CONTROLLER_NAME = 'Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private bookListRefreshSubject = new Subject<void>();
  public bookListRefresh$ = this.bookListRefreshSubject.asObservable();

  constructor(private http: HttpClient) {}

  public getBooks(): Observable<ApiResponse<Book[]>> {
    return this.http.get<ApiResponse<Book[]>>(`${environment.bookApiEndPoint}/${CONTROLLER_NAME}/list`);
  }

  public getBook(id: string): Observable<ApiResponse<Book>> {
    return this.http.get<ApiResponse<Book>>(`${environment.bookApiEndPoint}/${CONTROLLER_NAME}?id=${id}`);
  }

  public addBook(formData: FormData): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${environment.bookApiEndPoint}/${CONTROLLER_NAME}`, formData);
  }

  public removeBook(ids: string[]): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${environment.bookApiEndPoint}/${CONTROLLER_NAME}/delete`, ids);
  }

  public refreshBookList(): void {
    this.bookListRefreshSubject.next();
  }
}
