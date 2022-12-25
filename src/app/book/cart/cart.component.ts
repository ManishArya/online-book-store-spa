import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Cart, CartItem } from 'src/app/models/cart';
import { CartService } from '../../services/cart.service';

@Component({
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  public cartItems: CartItem[];
  public isWaiting: boolean;
  public totalPrice: number = 0;
  public isItemInCart: boolean;

  constructor(private cartService: CartService) {}

  public ngOnInit(): void {
    this.getCart().subscribe();
  }

  public remove(productId: string): void {
    this.cartService
      .removeCartItem(productId)
      .pipe(switchMap(() => this.getCart()))
      .subscribe();
  }

  public removeAll(): void {
    this.cartService
      .removeCart()
      .pipe(switchMap(() => this.getCart()))
      .subscribe();
  }

  public downQty(item: CartItem): void {
    let quantity = item.quantity;
    quantity = quantity - 1;
    if (quantity > 0) {
      this.updateQuantity(item.productId, quantity);
    }
  }

  public upQty(item: CartItem): void {
    let quantity = item.quantity;
    quantity = quantity + 1;
    this.updateQuantity(item.productId, quantity);
  }

  private updateQuantity(productId: string, quantity: number): void {
    this.isWaiting = true;
    this.cartService
      .updateQuantity(productId, quantity)
      .pipe(switchMap(() => this.getCart()))
      .subscribe();
  }

  private getCart(): Observable<ApiResponse<Cart>> {
    this.isWaiting = true;
    return this.cartService.getCart().pipe(
      tap((res) => {
        const cart = res.content ?? {};
        this.cartItems = cart.items;
        this.isItemInCart = this.cartItems?.length > 0;
        this.totalPrice = cart.totalPrice;
        const totalQuantity = cart.totalQuantity ?? 0;
        this.cartService.updateCount(totalQuantity);
      }),
      finalize(() => (this.isWaiting = false))
    );
  }
}
