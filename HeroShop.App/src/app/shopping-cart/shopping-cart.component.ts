import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DbCallsService } from '../shared/db-calls.service';
import { TemporaryShoppingCart } from '../shared/temporary-shopping-cart.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  constructor(private service: DbCallsService, private router: Router) {}
  ngOnDestroy(): void {
    if (this.subPostCart) this.subPostCart.unsubscribe();
  }

  activeShoppingCart!: TemporaryShoppingCart;
  totalPrice: number = 0;

  subPostCart!: Subscription;

  ngOnInit(): void {
    this.activeShoppingCart = this.service.activeShoppingCartData;
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
    console.log(this.calculateTotalPrice());
    console.log('Order Placed - TO DO');

    this.subPostCart = this.service
      .postNewOrder(this.service.activeShoppingCartData)
      .subscribe((res) => {
        next: {
          console.log('Order Created');
          this.service.activeShoppingCartData = new TemporaryShoppingCart();
          this.router.navigate(['/products']);
        }
      });
  }
}
