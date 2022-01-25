import { Product } from './product.model';

export class ProductShoppingCart {
  id!: number;
  product!: Product;
  amount!: number;
  shoppingCartId!: number;
}
