import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { IBook } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { MyListService } from 'src/app/services/my-list.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  templateUrl: './app-book.component.html',
  styleUrls: ['./app-book.component.scss']
})
export class AppBookComponent implements OnInit {
  public book: IBook;
  public isAdded: boolean;
  public isWaiting: boolean;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private myListService: MyListService,
    private toast: ToastService
  ) {}

  public ngOnInit(): void {
    this.isWaiting = true;
    this.route.params
      .pipe(
        switchMap((p) =>
          forkJoin([this.bookService.getBook(p.id), this.myListService.checkItemInMyList(p.id)]).pipe(
            finalize(() => (this.isWaiting = false))
          )
        )
      )
      .subscribe(([book, isExistsInMyList]) => ((this.book = book), (this.isAdded = isExistsInMyList)));
  }

  public addToMyList(): void {
    this.myListService.addToMyList(this.book.id).subscribe(
      () => (this.isAdded = true),
      (err) => this.toast.open(err.error)
    );
  }
}
