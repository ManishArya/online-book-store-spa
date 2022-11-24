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
    const quantity = this.myList.find((m) => m.book.id === id)?.quantity ?? 0;
    this.myListService
      .removeFromMyList(id)
      .pipe(switchMap(() => this.getMyList()))
      .subscribe(() => this.myListService.refreshListCounts(-quantity));
  }

  public removeAll(): void {
    this.myListService
      .removeAllFromMyList()
      .pipe(switchMap(() => this.getMyList()))
      .subscribe(() => this.myListService.refreshListCounts(0));
  }

  private getMyList(): Observable<ApiResponse<MyList[]>> {
    this.isWaiting = true;
    return this.myListService.getMyList().pipe(
      tap((res) => {
        this.myList = res.content;
        this.isItemInMyList = this.myList.length !== 0;
        const prices = this.myList?.map((m) => m.book?.price * m.quantity);
        this.computeTotalPrice(prices);
      }),
      finalize(() => (this.isWaiting = false))
    );
  }

  private computeTotalPrice(prices: number[]) {
    this.totalPrice = prices?.reduce((prev, curr) => (prev += curr), 0);
  }
}
