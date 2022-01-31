import { Product } from './product.model';

export class ProductShoppingCart {
  id!: number;
  product!: Product;
  amount!: number;
  shoppingCartId!: number;
}

export class ProductShoppingCartToPost {
  product!: Product;
  amount!: number;
  shoppingCartId!: number;
}
