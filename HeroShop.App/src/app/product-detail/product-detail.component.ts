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
  constructor(
    private dbCallsService: DbCallsService,
    private route: ActivatedRoute
  ) {}

  subProduct!: Subscription;
  productDetails: Product = new Product();

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    this.subProduct = this.dbCallsService
      .getProductDetail(productId!)
      .subscribe({ next: (prod) => (this.productDetails = prod) });
  }
  ngOnDestroy(): void {
    this.subProduct.unsubscribe();
  }
}
