import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, switchMap, take } from 'rxjs/operators';
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
    const bookObs = this.route.params.pipe(
      take(1),
      switchMap((p) => this.bookService.getBook(p.id))
    );
    bookObs
      .pipe(finalize(() => (this.isWaiting = false)))
      .subscribe((bookResponse) => (this.book = bookResponse.content));
  }

  public addToMyList(): void {
    if (this.authService.userLoggedStatus) {
      this.myListService.addToMyList(this.book.id).subscribe(
        () => this.myListService.refreshListCounts(1),
        (err) => this.toast.open((err.error as ApiResponse<string>).errorDescription)
      );
    } else {
      this.authService.signOut();
    }
  }
}
