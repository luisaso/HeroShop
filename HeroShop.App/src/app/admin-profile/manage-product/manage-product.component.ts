import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DbCallsService } from 'src/app/shared/db-calls.service';
import { Product } from 'src/app/shared/product.model';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css'],
})
export class ManageProductComponent implements OnInit, OnDestroy {
  constructor(private service: DbCallsService, private route: ActivatedRoute) {}

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

  newProduct: Product = new Product();
  subNewProduct!: Subscription;

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.subNewProduct) this.subNewProduct.unsubscribe();
  }

  addProduct() {
    this.subNewProduct = this.service
      .postNewProduct(this.newProduct)
      .subscribe({
        next: (res) => {
          console.log('PRODUCT CREATED');
          console.log(res);
        },
      });
  }

  selectManagePage(): boolean {
    //this.route.paramMap()
    return false;
  }
}
