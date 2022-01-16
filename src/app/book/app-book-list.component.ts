import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { forkJoin, Observable, Subject } from 'rxjs';
import { filter, finalize, switchMap, takeUntil, tap } from 'rxjs/operators';
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
export class AppBookListComponent implements OnInit, OnDestroy {
  public books: IBook[] = [];
  public isWaiting: boolean;
  public hasPermission: boolean;
  private bookIds: string[] = [];
  private ngUnsubscribe = new Subject<void>();

  public get isDeleteDisabled(): boolean {
    return this.bookIds.length === 0;
  }

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

    this.listenToRefreshBookList();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public openBookModal(): void {
    this.dialog.open(AppAddBookModalComponent, {
      width: '600px'
    });
  }

  public openBook(id: string) {
    this.router.navigate(['book', id]);
  }

  public selectBook(event: any, id: string): void {
    const index = this.bookIds.findIndex((b) => b === id);
    const isChecked = event.target.checked;

    if (isChecked) {
      if (index === -1) {
        this.bookIds.push(id);
      }
    } else {
      if (index !== -1) {
        this.bookIds.splice(index, 1);
      }
    }
  }

  public deleteBook(): void {
    const selectedBooksCount = this.bookIds.length;

    this.dialogService
      .openConfirmationDialog({
        header: 'Delete the Books',
        body: `Do you want to delete the selected ${selectedBooksCount} books ?`
      })
      .afterClosed()
      .pipe(
        filter((x) => !!x),
        switchMap(() => this.bookService.removeBook(this.bookIds))
      )
      .pipe(switchMap(() => this.getBooks()))
      .subscribe();
  }

  public refreshBookList(): void {
    this.bookIds = [];
    this.bookService.refreshBookList();
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

  private listenToRefreshBookList(): void {
    this.bookService.bookListRefresh$
      .pipe(
        takeUntil(this.ngUnsubscribe),
        switchMap(() => this.getBooks())
      )
      .subscribe();
  }
}
