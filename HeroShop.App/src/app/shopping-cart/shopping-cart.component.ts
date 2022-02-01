import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DbCallsService } from '../shared/db-calls.service';
import { ProductShoppingCartToPost } from '../shared/product-shopping-cart.model';
import { ShoppingCartToPost } from '../shared/shopping-cart.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  constructor(private service: DbCallsService, private router: Router) {}

  activeShoppingCart!: ShoppingCartToPost;
  totalPrice: number = 0;

  subPostCart!: Subscription;

  ngOnInit(): void {
    this.activeShoppingCart = this.service.activeShoppingCartData;
  }

  ngOnDestroy(): void {
    if (this.subPostCart) this.subPostCart.unsubscribe();
  }

  calculateTotalPrice(): number {
    console.log(this.activeShoppingCart);
    this.activeShoppingCart.productsShoppingCart!.forEach((element) => {
      this.totalPrice += element.product.price * element.amount;
    });
    let price = this.totalPrice;
    this.totalPrice = 0;
    return price;
  }

  placeOrder() {
    this.subPostCart = this.service
      .postNewOrder(this.service.activeShoppingCartData)
      .subscribe((res) => {
        next: {
          console.log('Order Created');
          this.service.activeShoppingCartData = new ShoppingCartToPost();
          this.router.navigate(['/products']);
        }
      });
  }

  addOne(product: ProductShoppingCartToPost) {
    this.service.addToCart(product.product, 1);
    this.activeShoppingCart = this.service.activeShoppingCartData;
  }

  subOne(product: ProductShoppingCartToPost) {
    this.service.addToCart(product.product, -1);
    this.activeShoppingCart = this.service.activeShoppingCartData;
  }

  removeOne(product: ProductShoppingCartToPost) {
    this.service.removeFromCart(product.product.productId);
    this.activeShoppingCart = this.service.activeShoppingCartData;
  }

  removeAll() {
    this.service.removeAllFromCart();
    this.activeShoppingCart = this.service.activeShoppingCartData;
  }

  trackItem(index: number, prod: ProductShoppingCartToPost) {
    return prod.shoppingCartId;
  }
}
