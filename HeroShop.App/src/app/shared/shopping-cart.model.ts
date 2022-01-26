import { ProductShoppingCart } from './product-shopping-cart.model';

export class ShoppingCart {
  shoppingCartId?: number = 0;
  total!: number;
  userId!: number;
  orderPlaced?: Date = new Date(); //este Date é diferente do DateTime do c# e não dá para ser null
  productsShoppingCart?: ProductShoppingCart[] = [];
}
