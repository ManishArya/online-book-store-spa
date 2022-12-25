export interface Cart {
  id: string;
  totalPrice: number;
  totalQuantity: number;
  items: CartItem[];
}

export interface CartItem {
  productId: string;
  price: number;
  title: string;
  image: string;
  quantity: number;
}
