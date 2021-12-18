import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { IApiResponse } from 'src/app/models/api-response.model';
import { IMyList } from '../../models/my-list';
import { MyListService } from '../../services/my-list.service';

@Component({
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {
  public myList: IMyList[];
  public isWaiting: boolean;

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

  private getMyList(): Observable<IApiResponse<IMyList[]>> {
    this.isWaiting = true;
    return this.myListService.getMyList().pipe(
      tap((res) => (this.myList = res.content)),
      finalize(() => (this.isWaiting = false))
    );
  }
}
