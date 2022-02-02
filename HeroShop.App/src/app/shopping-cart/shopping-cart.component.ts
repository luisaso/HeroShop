import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  constructor(
    private service: DbCallsService,
    private router: Router,
    private toastr: ToastrService
  ) {}

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
          this.service.activeShoppingCartData = new ShoppingCartToPost();
          this.toastr.success('Order Placed');
          this.router.navigate(['/products']);
        }
      });
  }

  addOne(product: ProductShoppingCartToPost) {
    this.service.addToCart(product.product, 1);
    this.activeShoppingCart = this.service.activeShoppingCartData;
    this.toastr.success('Added to Cart');
  }

  subOne(product: ProductShoppingCartToPost) {
    this.service.addToCart(product.product, -1);
    this.activeShoppingCart = this.service.activeShoppingCartData;
    this.toastr.warning('Removed from Cart');
  }

  removeOne(product: ProductShoppingCartToPost) {
    this.service.removeFromCart(product.product.productId);
    this.activeShoppingCart = this.service.activeShoppingCartData;
    this.toastr.warning('Products removed from Cart');
  }

  removeAll() {
    this.service.removeAllFromCart();
    this.activeShoppingCart = this.service.activeShoppingCartData;
    this.toastr.warning('Emptied Cart');
  }

  trackItem(index: number, prod: ProductShoppingCartToPost) {
    return prod.shoppingCartId;
  }
}
