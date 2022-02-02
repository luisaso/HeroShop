import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DbCallsService } from 'src/app/shared/db-calls.service';
import { Product } from 'src/app/shared/product.model';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css'],
})
export class ManageProductComponent implements OnInit, OnDestroy {
  constructor(
    private service: DbCallsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  auxTypes: string[] = [
    'Weapon',
    'Wand',
    'Rod',
    'Potion',
    'Armor',
    'Scroll',
    'Wondrous',
  ];
  auxRarity: string[] = [
    'Common',
    'Uncommon',
    'Rare',
    'Very Rare',
    'Legendary',
  ];
  manageType: string[] = ['add', 'edit', 'remove'];

  subNewProduct!: Subscription;
  subAllProduct!: Subscription;
  subUpdateProduct!: Subscription;
  subDeleteProduct!: Subscription;

  allProducts: Product[] = [];
  newProduct: Product = new Product();
  selectedProduct: Product = new Product();

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.subNewProduct) this.subNewProduct.unsubscribe();
    if (this.subAllProduct) this.subAllProduct.unsubscribe();
    if (this.subUpdateProduct) this.subUpdateProduct.unsubscribe();
    if (this.subDeleteProduct) this.subDeleteProduct.unsubscribe();
  }

  addProduct() {
    this.subNewProduct = this.service
      .postNewProduct(this.newProduct)
      .subscribe({
        next: (res) => {
          this.toastr.success('New Product Created');
        },
      });
  }

  editProduct() {
    this.subUpdateProduct = this.service
      .updateProduct(this.selectedProduct)
      .subscribe({
        next: (res) => {
          this.toastr.success('Product Updated');
        },
      });
  }

  deleteProduct() {
    this.subDeleteProduct = this.service
      .deleteProduct(this.selectedProduct)
      .subscribe({
        next: (res) => {
          this.toastr.success('Product Deleted');
          this.router.navigate(['/admin']);
        },
      });
  }

  selectManagePage(): string {
    let selectedType: string = this.route.snapshot.queryParamMap.get('type')!;

    if (selectedType != 'add' && !this.subAllProduct) {
      this.subAllProduct = this.service.getAllProducts().subscribe({
        next: (prods) => {
          this.allProducts = prods;
        },
      });
    }

    return selectedType;
  }
}
