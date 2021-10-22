import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBook } from '../models/book';

const CONTROLLER_NAME = 'Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) {}

  public getBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(`${environment.bookApiEndPoint}/${CONTROLLER_NAME}/list`);
  }

  public getBook(id: string): Observable<IBook> {
    return this.http.get<IBook>(`${environment.bookApiEndPoint}/${CONTROLLER_NAME}?id=${id}`);
  }

  public addBook(formData: FormData) {
    return this.http.post(`${environment.bookApiEndPoint}/${CONTROLLER_NAME}`, formData);
  }

  public removeBook(id: string) {
    return this.http.delete(`${environment.bookApiEndPoint}/${CONTROLLER_NAME}?id=${id}`);
  }
}
