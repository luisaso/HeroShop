import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DbCallsService } from '../shared/db-calls.service';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  constructor(
    private service: DbCallsService,
    private router: Router,
    private toastr: ToastrService
  ) {}

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
    if (this.subProducts) this.subProducts.unsubscribe();
  }

  goToProductPage(prodId: number) {
    this.router.navigate(['/products', prodId]);
  }

  addToCart(prod: Product, amountToAdd: number) {
    amountToAdd = Math.trunc(amountToAdd);
    if (amountToAdd < 1 || !amountToAdd) {
      amountToAdd = 1;
    }
    this.service.addToCart(prod, amountToAdd);
    this.toastr.success('Added to Cart');
  }

  removeFromCart(prod: Product) {
    this.service.removeFromCart(prod.productId);
    this.toastr.warning('Product removed from Cart');
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
