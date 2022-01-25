import { ProductShoppingCart } from './product-shopping-cart.model';

export class ShoppingCart {
  shoppingCartId!: number;
  total!: number;
  userId!: number;
  orderPlaced?: Date;
  productsShoppingCart?: ProductShoppingCart[];
}
