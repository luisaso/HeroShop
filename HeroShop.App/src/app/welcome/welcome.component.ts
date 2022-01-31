import { Component, OnDestroy, OnInit } from '@angular/core';
import { DbCallsService } from '../shared/db-calls.service';
import { ShoppingCartToPost } from '../shared/shopping-cart.model';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit, OnDestroy {
  constructor(private service: DbCallsService) {}

  user!: User;
  shoppingCart!: ShoppingCartToPost;

  ngOnInit(): void {
    this.user = this.service.activeUserData;
    this.shoppingCart = this.service.activeShoppingCartData;
  }
  ngOnDestroy(): void {}

  getUserId() {
    this.user = this.service.activeUserData;
    return this.user.userId;
  }

  isLoggedIn(): boolean {
    return this.service.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.service.activeUserData.admin;
  }

  onLogout() {
    this.service.logOut();
  }
}
