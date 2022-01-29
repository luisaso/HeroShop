import { Component, OnInit } from '@angular/core';
import { DbCallsService } from '../shared/db-calls.service';
import { TemporaryShoppingCart } from '../shared/temporary-shopping-cart.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  constructor(private service: DbCallsService) {}

  activeShoppingCart!: TemporaryShoppingCart;
  totalPrice: number = 0;

  ngOnInit(): void {
    this.activeShoppingCart = this.service.activeShoppingCartData;
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
    console.log(this.calculateTotalPrice());
    console.log('Order Placed - TO DO');
  }
}
