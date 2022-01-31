import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Product } from './product.model';
import { ShoppingCart, ShoppingCartToPost } from './shopping-cart.model';
import { Observable } from 'rxjs';
import {
  ProductShoppingCart,
  ProductShoppingCartToPost,
} from './product-shopping-cart.model';

@Injectable({
  providedIn: 'root',
})
export class DbCallsService {
  constructor(private http: HttpClient) {}

  readonly baseURL = 'http://localhost:5287/api';

  activeUserData: User = new User();
  activeShoppingCartData: ShoppingCartToPost = new ShoppingCartToPost();

  rarityCheck: string[] = [
    'Common',
    'Uncommon',
    'Rare',
    'Very Rare',
    'Legendary',
  ];
  rarityColors: string[] = [
    'grey',
    'green',
    'cornflowerblue',
    'blueviolet',
    'goldenrod',
  ];

  getAllProducts(): Observable<Product[]> {
    let actualUrl = this.baseURL + '/Products';
    return this.http.get<Product[]>(actualUrl);
  }

  getProductDetail(productId: string): Observable<Product> {
    let actualUrl = this.baseURL + '/Products/' + productId;
    return this.http.get<Product>(actualUrl);
  }

  getUsers(): Observable<User[]> {
    let actualUrl = this.baseURL + '/Users/';
    return this.http.get<User[]>(actualUrl);
  }

  getUser(userId: string): Observable<User> {
    let actualUrl = this.baseURL + '/Users/' + userId;
    return this.http.get<User>(actualUrl);
  }

  getShoppingCart(userId: string): Observable<ShoppingCart> {
    let actualUrl = this.baseURL + '/Users/' + userId + '/ShoppingCart';
    return this.http.get<ShoppingCart>(actualUrl);
  }

  postNewUser(username: string, password: string): Observable<User> {
    let actualUrl = this.baseURL + '/Users/';
    let newUser: User = new User();
    newUser.admin = false;
    newUser.password = password;
    newUser.username = username;
    const headers = { 'content-type': 'application/json' };
    return this.http.post<User>(actualUrl, JSON.stringify(newUser), {
      headers: headers,
    });
  }

  // postNewCart(userId: number): Observable<ShoppingCart> {
  //   let actualUrl = this.baseURL + '/Users/';
  //   let newCart = this.activeShoppingCartData;
  //   newCart.userId = userId;
  //   const headers = { 'content-type': 'application/json' };
  //   return this.http.post<ShoppingCart>(actualUrl, JSON.stringify(newCart), {
  //     headers: headers,
  //   });
  // }

  postNewProduct(newProduct: Product): Observable<Product> {
    let actualUrl = this.baseURL + '/Products';
    const headers = { 'content-type': 'application/json' };
    newProduct.productId = 0;
    return this.http.post<Product>(actualUrl, JSON.stringify(newProduct), {
      headers: headers,
    });
  }

  postNewOrder(newOrder: ShoppingCartToPost): Observable<ShoppingCart> {
    console.log(newOrder);
    let actualUrl =
      this.baseURL + '/Users/' + newOrder.userId + '/ShoppingCart';
    const headers = { 'content-type': 'application/json' };
    return this.http.post<any>(actualUrl, JSON.stringify(newOrder), {
      headers: headers,
    });
  }

  updateUser(updatedUser: User): Observable<any> {
    let actualUrl = this.baseURL + '/Users/' + this.activeUserData.userId;
    const headers = { 'content-type': 'application/json' };
    return this.http.put<any>(actualUrl, JSON.stringify(updatedUser), {
      headers: headers,
    });
  }

  updateProduct(updatedProduct: Product): Observable<any> {
    let actualUrl = this.baseURL + '/Products/' + updatedProduct.productId;
    const headers = { 'content-type': 'application/json' };
    return this.http.put<any>(actualUrl, JSON.stringify(updatedProduct), {
      headers: headers,
    });
  }

  deleteProduct(updatedProduct: Product): Observable<any> {
    let actualUrl = this.baseURL + '/Products/' + updatedProduct.productId;
    return this.http.delete<any>(actualUrl);
  }

  createNewTemporaryCart(userId: number) {
    this.activeShoppingCartData = new ShoppingCartToPost();

    this.activeShoppingCartData.userId = userId;
  }

  verifyUserLogin(username: string, password: string): Observable<User> {
    let actualUrl = this.baseURL + '/Users/' + username + '/' + password;
    return this.http.get<User>(actualUrl);
  }

  isLoggedIn(): boolean {
    if (this.activeUserData?.userId) {
      if (this.activeUserData.userId > 0) {
        return true;
      }
    }
    return false;
  }

  logOut() {
    this.activeUserData = new User();
    this.activeShoppingCartData = new ShoppingCartToPost();
  }

  isInCart(prodId: number): boolean {
    if (this.activeShoppingCartData.productsShoppingCart == []) {
      return false;
    }

    let itExists = false;
    this.activeShoppingCartData.productsShoppingCart!.forEach((element) => {
      if (element.product.productId == prodId) {
        itExists = true;
      }
    });

    return itExists;
  }

  calculateTotal(shoppingCart: ShoppingCartToPost): number {
    let total: number = 0;
    if (shoppingCart.productsShoppingCart) {
      shoppingCart.productsShoppingCart.forEach((orderItem) => {
        total += orderItem.amount * orderItem.product.price;
      });
    }
    return total;
  }

  addToCart(prodId: number, amount: number) {
    if (!this.isInCart) {
    }

    this.activeShoppingCartData.productsShoppingCart!.forEach((element) => {
      if (element.product.productId == prodId) {
        element.amount += amount;
        if (element.amount <= 0) {
          this.removeFromCart(prodId);
        }
      }
    });
  }

  removeFromCart(prodId: number) {
    this.activeShoppingCartData.productsShoppingCart!.forEach(
      (element, index) => {
        if (element.product.productId == prodId) {
          this.activeShoppingCartData.productsShoppingCart!.splice(index, 1);
        }
      }
    );
  }

  removeFromCartByProd(prodId: number) {
    this.activeShoppingCartData.productsShoppingCart!.forEach(
      (element, index) => {
        if (element.product.productId == prodId) {
          this.activeShoppingCartData.productsShoppingCart!.splice(index, 1);
        }
      }
    );
  }

  removeAllFromCart() {
    this.activeShoppingCartData = new ShoppingCartToPost();
  }
}
