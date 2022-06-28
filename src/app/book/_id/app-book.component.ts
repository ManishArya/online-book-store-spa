import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, iif, of } from 'rxjs';
import { finalize, map, switchMap } from 'rxjs/operators';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Book } from 'src/app/models/book';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { MyListService } from 'src/app/services/my-list.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  templateUrl: './app-book.component.html'
})
export class AppBookComponent implements OnInit {
  public book: Book;
  public isAdded: boolean;
  public isWaiting: boolean;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private myListService: MyListService,
    private toast: ToastService,
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.isWaiting = true;
    this.route.params
      .pipe(
        switchMap((p) =>
          forkJoin([
            this.bookService.getBook(p.id),
            iif(
              () => this.authService.userLoggedStatus,
              this.myListService.checkItemInMyList(p.id).pipe(map((res) => res.content)),
              of(false)
            )
          ]).pipe(finalize(() => (this.isWaiting = false)))
        )
      )
      .subscribe(([book, isExistsInMyList]) => ((this.book = book.content), (this.isAdded = isExistsInMyList)));
  }

  public addToMyList(): void {
    if (this.authService.userLoggedStatus) {
      this.myListService.addToMyList(this.book.id).subscribe(
        () => {
          this.isAdded = true;
          this.myListService.refreshListCounts(1);
        },
        (err) => this.toast.open((err.error as ApiResponse<string>).errorDescription)
      );
    } else {
      this.authService.signOut();
    }
  }
}
