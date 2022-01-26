import { ProductShoppingCart } from './product-shopping-cart.model';

export class TemporaryShoppingCart {
  userId!: number;
  productsShoppingCart?: ProductShoppingCart[] = [];
}
