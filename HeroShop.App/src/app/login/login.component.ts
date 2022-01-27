import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DbCallsService } from '../shared/db-calls.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private service: DbCallsService, private router: Router) {}

  username!: string;
  password!: string;
  subLogin!: Subscription;
  subCreateUser!: Subscription;
  subCreateCart!: Subscription;
  subShopCart!: Subscription;

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.subLogin) this.subLogin.unsubscribe();
    if (this.subCreateUser) this.subCreateUser.unsubscribe();
    if (this.subShopCart) this.subShopCart.unsubscribe();
  }

  verifyLogin() {
    this.subLogin = this.service
      .verifyUserLogin(this.username, this.password)
      .subscribe({
        next: (res) => {
          if (res != null) {
            this.service.activeUserData = res;
            this.loggedIn();
          }
        },
      });
  }

  loggedIn() {
    let userId: string = '' + this.service.activeUserData.userId;
    this.subShopCart = this.service.getShoppingCart(userId).subscribe((res) => {
      next: {
        this.service.activeShoppingCartData = res;
        this.router.navigate(['/products']);
      }
    });
  }

  saveToCreateUser() {
    this.subCreateUser = this.service
      .postNewUser(this.username, this.password)
      .subscribe((res) => {
        next: {
          this.service.activeUserData = res;
          this.service.createNewTemporaryCart(res.userId!);
        }
      });
  }

  //createOrder() {
  //Só serve para enviar um carrinho já terminado
  //   this.subCreateCart = this.service
  //     .postNewCart(this.service.activeUserData.userId!)
  //     .subscribe((res) => {
  //       next: {
  //         console.log('NEW CART');
  //         this.service.activeShoppingCartData = res;
  //         this.router.navigate([
  //           '/users',
  //           { id: this.service.activeUserData.userId },
  //         ]);
  //       }
  //     });
  //
  //}
}
