import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private service: DbCallsService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

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
    this.amountToAdd = Math.trunc(this.amountToAdd);
    if (this.amountToAdd < 1) {
      this.amountToAdd = 1;
    }
    this.service.addToCart(this.productDetails, this.amountToAdd);
    this.toastr.success('Added to Cart');
  }

  removeFromCart() {
    this.service.removeFromCart(this.productDetails.productId);
    this.toastr.warning('Product removed from Cart');
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
