import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { ApiResponse } from 'src/app/models/api-response.model';
import { MyList } from '../../models/my-list';
import { MyListService } from '../../services/my-list.service';

@Component({
  templateUrl: './my-list.component.html'
})
export class MyListComponent implements OnInit {
  public myList: MyList[];
  public isWaiting: boolean;
  public totalPrice: number = 0;
  public isItemInMyList: boolean;

  constructor(private myListService: MyListService) {}

  public ngOnInit(): void {
    this.getMyList().subscribe();
  }

  public remove(id: string): void {
    this.myListService
      .removeFromMyList(id)
      .pipe(switchMap(() => this.getMyList()))
      .subscribe();
  }

  public removeAll(): void {
    this.myListService
      .removeAllFromMyList()
      .pipe(switchMap(() => this.getMyList()))
      .subscribe();
  }

  public downQty(list: MyList): void {
    let quantity = list.quantity;
    quantity = quantity - 1;
    if (quantity > 0) {
      this.updateQuantity(list.book.id, quantity);
    }
  }

  public upQty(list: MyList): void {
    let quantity = list.quantity;
    quantity = quantity + 1;
    this.updateQuantity(list.book.id, quantity);
  }

  private updateQuantity(bookId: string, quantity: number): void {
    this.isWaiting = true;
    this.myListService
      .addToMyList({ bookId, quantity })
      .pipe(switchMap(() => this.getMyList()))
      .subscribe();
  }

  private getMyList(): Observable<ApiResponse<MyList[]>> {
    this.isWaiting = true;
    return this.myListService.getMyList().pipe(
      tap((res) => {
        this.myList = res.content;
        this.isItemInMyList = this.myList.length !== 0;
        const prices = this.myList?.map((m) => m.book?.price * m.quantity);
        this.totalPrice = this.compute(prices);
        const quanties = this.myList?.map((m) => m.quantity);
        const totalQuantity = this.compute(quanties);
        this.myListService.updateCount(totalQuantity);
      }),
      finalize(() => (this.isWaiting = false))
    );
  }

  private compute(numbers: number[]): number {
    return numbers?.reduce((prev, curr) => (prev += curr), 0);
  }
}
