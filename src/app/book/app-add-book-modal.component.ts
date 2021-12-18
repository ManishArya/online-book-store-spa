import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
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

  constructor(
    private bookService: BookService,
    private matDialogRef: MatDialogRef<AppAddBookModalComponent>,
    private genreService: GenreService
  ) {}

  public ngOnInit(): void {
    this.genreService.getGenres().subscribe((g) => (this.genreOptions = g.content));
  }

  public addBook(): void {
    const book = {
      name: this.name,
      description: this.description,
      releaseDate: this.date,
      genres: this.genres
    };
    const formData = new FormData();
    formData.set('poster', this.photo.nativeElement.files[0]);
    formData.set('bookString', JSON.stringify(book));
    this.isWaiting = true;

    this.bookService
      .addBook(formData)
      .pipe(finalize(() => (this.isWaiting = false)))
      .subscribe((res) => {
        this.matDialogRef.close(true);
      });
  }
}
