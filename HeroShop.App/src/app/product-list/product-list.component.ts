import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DbCallsService } from '../shared/db-calls.service';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  constructor(private service: DbCallsService, private router: Router) {}

  rarityCheck: string[] = this.service.rarityCheck;
  rarityColors: string[] = this.service.rarityColors;

  subProducts!: Subscription;
  products: Product[] = [];
  amountToAdd: number[] = [];

  ngOnInit(): void {
    this.subProducts = this.service.getAllProducts().subscribe({
      next: (prods) => (this.products = prods),
    });
  }

  ngOnDestroy(): void {
    this.subProducts.unsubscribe();
  }

  goToProductPage(prodId: number) {
    this.router.navigate(['/products', prodId]);
  }

  addToCart(prod: Product, amountToAdd: number) {
    console.log(amountToAdd);
    if (amountToAdd < 1 || !amountToAdd) {
      amountToAdd = 1;
    }
    this.service.addToCart(prod, amountToAdd);
  }

  removeFromCart(prod: Product) {
    this.service.removeFromCart(prod.productId);
  }

  isInCart(prod: Product): boolean {
    return this.service.isInCart(prod.productId);
  }

  howManyInCart(prod: Product): number {
    return this.service.howManyInCart(prod.productId);
  }

  isLoggedIn(): boolean {
    return this.service.isLoggedIn();
  }
}

// [routerLink]="['/products', product.productId]"
