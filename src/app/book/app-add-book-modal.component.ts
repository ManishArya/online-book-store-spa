import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response.model';
import { BookService } from '../services/book.service';
import { ToastService } from '../services/toast.service';

@Component({
  templateUrl: './app-add-book-modal.component.html'
})
export class AppAddBookModalComponent {
  public name: string | undefined;
  public author: string | undefined;
  public date: Date | undefined;
  public description: string | undefined;
  public price: number | undefined;
  public isWaiting: boolean;
  public validations: { [key: string]: string };
  @ViewChild('poster') public poster: ElementRef;

  constructor(
    private matDialogRef: MatDialogRef<AppAddBookModalComponent>,
    private bookService: BookService,
    private toastService: ToastService
  ) {}

  public addBook(closed: boolean): void {
    this.validations = {};
    const book = {
      name: this.name,
      description: this.description,
      releaseDate: this.date,
      author: this.author,
      price: this.price
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
    this.name = undefined;
    this.description = undefined;
    this.date = undefined;
    this.price = undefined;
    this.poster.nativeElement.value = '';
    this.author = undefined;
  }
}
