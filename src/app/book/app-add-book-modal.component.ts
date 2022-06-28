import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response.model';
import { Genre } from '../models/genre';
import { BookService } from '../services/book.service';
import { GenreService } from '../services/genre.service';
import { ToastService } from '../services/toast.service';

@Component({
  templateUrl: './app-add-book-modal.component.html'
})
export class AppAddBookModalComponent implements OnInit {
  public name: string;
  public genreOptions: Genre[] = [];
  public date: any;
  public genres: string[];
  public description: string;
  public isWaiting: boolean;
  public validations: { [key: string]: string };
  @ViewChild('poster') public poster: ElementRef;

  constructor(
    private matDialogRef: MatDialogRef<AppAddBookModalComponent>,
    private bookService: BookService,
    private genreService: GenreService,
    private toastService: ToastService
  ) {}

  public ngOnInit(): void {
    this.genreService.getGenres().subscribe((genres) => (this.genreOptions = genres));
  }

  public addBook(closed: boolean): void {
    this.validations = {};
    const book = {
      name: this.name,
      description: this.description,
      releaseDate: this.date,
      genres: this.genres
    };

    const formData = new FormData();
    formData.set('content', JSON.stringify(book));
    formData.set('poster', this.poster.nativeElement.files[0]);

    this.isWaiting = true;

    this.bookService
      .addBook(formData)
      .pipe(finalize(() => (this.isWaiting = false)))
      .subscribe(
        () => {
          this.resetBookForm();
          this.bookService.refreshBookList();
          if (closed) {
            this.matDialogRef.close(true);
          }
        },
        (err: HttpErrorResponse) => {
          if (err.status === 400) {
            this.validations = (err.error as ApiResponse<{ [key: string]: string }>).content;
          } else {
            this.toastService.open((err.error as ApiResponse<string>).errorDescription);
          }
        }
      );
  }

  private resetBookForm(): void {
    this.name = undefined as any;
    this.description = undefined as any;
    this.date = undefined;
    this.genres = undefined as any;
    this.poster.nativeElement.value = '';
  }
}
