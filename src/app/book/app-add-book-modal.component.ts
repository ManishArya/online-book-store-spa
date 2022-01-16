import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { IApiResponse } from '../models/api-response.model';
import { IGenre } from '../models/genre';
import { BookService } from '../services/book.service';
import { GenreService } from '../services/genre.service';

@Component({
  templateUrl: './app-add-book-modal.component.html'
})
export class AppAddBookModalComponent implements OnInit {
  @ViewChild('photo') photo: ElementRef;
  public name: string;
  public genreOptions: IGenre[] = [];
  public date: any;
  public genres: string[];
  public description: string;
  public isWaiting: boolean;
  public validations: { [key: string]: string };

  constructor(
    private bookService: BookService,
    private matDialogRef: MatDialogRef<AppAddBookModalComponent>,
    private genreService: GenreService
  ) {}

  public ngOnInit(): void {
    this.genreService.getGenres().subscribe((g) => (this.genreOptions = g.content));
  }

  public addBook(closed: boolean): void {
    const formData = new FormData();
    formData.set('poster', this.photo.nativeElement.files[0]);
    const book = {
      name: this.name,
      description: this.description,
      releaseDate: this.date,
      genres: this.genres
    };
    formData.set('bookString', JSON.stringify(book));

    this.isWaiting = true;

    this.bookService
      .addBook(formData)
      .pipe(finalize(() => (this.isWaiting = false)))
      .subscribe(
        (res) => {
          this.resetValues();
          this.bookService.refreshBookList();
          if (closed) {
            this.matDialogRef.close(true);
          }
        },
        (err: any) => (this.validations = (err.error as IApiResponse<{ [key: string]: string }>).content)
      );
  }

  private resetValues(): void {
    this.name = undefined as any;
    this.description = undefined as any;
    this.date = undefined;
    this.genres = undefined as any;
    this.photo.nativeElement.value = '';
  }
}
