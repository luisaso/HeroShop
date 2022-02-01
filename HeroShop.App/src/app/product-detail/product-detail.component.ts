import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DbCallsService } from '../shared/db-calls.service';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  constructor(private service: DbCallsService, private route: ActivatedRoute) {}

  subProduct!: Subscription;
  productDetails: Product = new Product();

  rarityCheck: string[] = this.service.rarityCheck;
  rarityColors: string[] = this.service.rarityColors;
  amountToAdd: number = 1;

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    this.subProduct = this.service
      .getProductDetail(productId!)
      .subscribe({ next: (prod) => (this.productDetails = prod) });
  }
  ngOnDestroy(): void {
    if (this.subProduct) this.subProduct.unsubscribe();
  }

  addToCart() {
    if (this.amountToAdd < 1) {
      this.amountToAdd = 1;
    }
    this.service.addToCart(this.productDetails, this.amountToAdd);
    console.log(this.service.activeShoppingCartData);
  }

  removeFromCart() {
    this.service.removeFromCart(this.productDetails.productId);
  }

  isInCart(): boolean {
    return this.service.isInCart(this.productDetails.productId);
  }

  howManyInCart(): number {
    return this.service.howManyInCart(this.productDetails.productId);
  }

  isLoggedIn(): boolean {
    return this.service.isLoggedIn();
  }
}
