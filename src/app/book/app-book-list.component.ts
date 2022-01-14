import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { filter, finalize, switchMap, tap } from 'rxjs/operators';
import { IApiResponse } from '../models/api-response.model';
import { IBook } from '../models/book';
import { BookService } from '../services/book.service';
import { AppTitleService } from '../services/title.service';
import { UserService } from '../services/user.service';
import { DialogService } from '../shared/app-confirmation-dialog/dialog.service';
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
    private userService: UserService,
    private dialogService: DialogService
  ) {}

  public ngOnInit(): void {
    this.title.setTitle();
    forkJoin([
      this.getBooks(),
      this.userService.userProfile$.pipe(tap((res) => (this.hasPermission = res.isAdmin)))
    ]).subscribe();
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
      .subscribe((res) => (this.books = res.content));
  }

  public openBook(id: string) {
    this.router.navigate(['book', id]);
  }

  public removeBook(id: string): void {
    const name = this.books.find((b) => b.id === id)?.name;

    this.dialogService
      .openConfirmationDialog({
        header: 'Delete a Book',
        body: `Do you want to delete the ${name} ?`
      })
      .afterClosed()
      .pipe(
        filter((x) => !!x),
        switchMap(() => this.bookService.removeBook(id))
      )
      .pipe(switchMap(() => this.getBooks()))
      .subscribe();
  }

  private getBooks(): Observable<IApiResponse<IBook[]>> {
    this.isWaiting = true;
    return this.bookService.getBooks().pipe(
      tap((res) => {
        this.books = res.content;
      }),
      finalize(() => (this.isWaiting = false))
    );
  }
}
