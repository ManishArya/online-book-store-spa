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

  constructor(private myListService: MyListService) {}

  public ngOnInit(): void {
    this.getMyList().subscribe();
  }

  public remove(id: string): void {
    this.myListService
      .removeFromMyList(id)
      .pipe(switchMap(() => this.getMyList()))
      .subscribe(() => this.myListService.refreshListCounts(-1));
  }

  private getMyList(): Observable<ApiResponse<MyList[]>> {
    this.isWaiting = true;
    return this.myListService.getMyList().pipe(
      tap((res) => (this.myList = res.content)),
      finalize(() => (this.isWaiting = false))
    );
  }
}
