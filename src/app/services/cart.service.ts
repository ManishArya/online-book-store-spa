import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Cart, CartItem } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private countIncrementSubject = new Subject<number>();
  public countIncrement$ = this.countIncrementSubject.asObservable();
  private countUpdateSubject = new Subject<number>();
  public countUpdate$ = this.countUpdateSubject.asObservable();

  constructor(private http: HttpClient) {}

  public getCart(): Observable<ApiResponse<Cart>> {
    return this.http.get<ApiResponse<Cart>>(`${environment.cartApiEndPoint}/Cart`);
  }

  public addItemToCart(cartItem: CartItem): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${environment.cartApiEndPoint}/Cart/add`, cartItem);
  }

  public updateQuantity(productId: string, quantity: number): Observable<any> {
    return this.http.put(`${environment.cartApiEndPoint}/Cart/updateqty`, null, {
      params: new HttpParams().set('productId', productId).set('quantity', quantity)
    });
  }

  public removeCartItem(productId: string): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${environment.cartApiEndPoint}/Cart/cartitem`, {
      params: new HttpParams().set('productId', productId)
    });
  }

  public getTotalQuantity(): Observable<ApiResponse<number>> {
    return this.http.get<ApiResponse<number>>(`${environment.cartApiEndPoint}/Cart/counts`);
  }

  public incrementCount(count: number): void {
    this.countIncrementSubject.next(count);
  }

  public updateCount(count: number): void {
    this.countUpdateSubject.next(count);
  }

  public removeCart(): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${environment.cartApiEndPoint}/Cart/removecart`);
  }
}
