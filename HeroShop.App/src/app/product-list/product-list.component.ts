import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DbCallsService } from '../shared/db-calls.service';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  constructor(private service: DbCallsService) {}

  rarityCheck: string[] = this.service.rarityCheck;
  rarityColors: string[] = this.service.rarityColors;

  subProducts!: Subscription;
  products: Product[] = [];

  ngOnInit(): void {
    this.subProducts = this.service.getAllProducts().subscribe({
      next: (prods) => (this.products = prods),
    });
  }

  ngOnDestroy(): void {
    this.subProducts.unsubscribe();
  }
}
