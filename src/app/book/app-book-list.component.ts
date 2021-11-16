import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { filter, finalize, switchMap, tap } from 'rxjs/operators';
import { IBook } from '../models/book';
import { BookService } from '../services/book.service';
import { AppTitleService } from '../services/title.service';
import { UserService } from '../services/user.service';
import { AppAddBookModalComponent } from './app-add-book-modal.component';

@Component({
  templateUrl: './app-book-list.component.html'
})
export class AppBookListComponent implements OnInit {
  public books: IBook[] = [];
  public isWaiting: boolean;
  public hasPermission: boolean;

  constructor(
    private bookService: BookService,
    private dialog: MatDialog,
    private router: Router,
    private title: AppTitleService,
    private userService: UserService
  ) {}

  public ngOnInit(): void {
    this.title.setTitle();
    combineLatest([this.getBooks(), this.userService.userProfile$])
      .pipe(finalize(() => (this.isWaiting = false)))
      .subscribe(([book, userProfile]) => {
        this.hasPermission = userProfile.isAdmin;
      });
  }

  public openBookModal(): void {
    this.dialog
      .open(AppAddBookModalComponent, {
        width: '600px'
      })
      .afterClosed()
      .pipe(
        filter((res) => !!res),
        switchMap(() => this.getBooks())
      )
      .subscribe((res) => (this.books = res));
  }

  public openBook(id: string) {
    this.router.navigate(['book', id]);
  }

  public removeBook(id: string): void {
    this.bookService
      .removeBook(id)
      .pipe(switchMap(() => this.getBooks()))
      .subscribe();
  }

  private getBooks(): Observable<IBook[]> {
    this.isWaiting = true;
    return this.bookService.getBooks().pipe(
      tap((res) => (this.books = res)),
      finalize(() => (this.isWaiting = false))
    );
  }
}
