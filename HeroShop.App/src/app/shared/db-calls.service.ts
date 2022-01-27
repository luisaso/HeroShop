import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Product } from './product.model';
import { ShoppingCart } from './shopping-cart.model';
import { Observable } from 'rxjs';
import { TemporaryShoppingCart } from './temporary-shopping-cart.model';

@Injectable({
  providedIn: 'root',
})
export class DbCallsService {
  constructor(private http: HttpClient) {}

  readonly baseURL = 'http://localhost:5287/api';

  activeUserData: User = new User();
  activeShoppingCartData: TemporaryShoppingCart = new TemporaryShoppingCart();

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

  postNewCart(userId: number): Observable<ShoppingCart> {
    let actualUrl = this.baseURL + '/Users/';
    let newCart = this.activeShoppingCartData;
    newCart.userId = userId;
    const headers = { 'content-type': 'application/json' };
    return this.http.post<ShoppingCart>(actualUrl, JSON.stringify(newCart), {
      headers: headers,
    });
  }

  postNewProduct(newProduct: Product): Observable<Product> {
    let actualUrl = this.baseURL + '/Products';
    const headers = { 'content-type': 'application/json' };
    newProduct.productId = 0;
    return this.http.post<Product>(actualUrl, JSON.stringify(newProduct), {
      headers: headers,
    });
  }

  updateUser(updatedUser: User): Observable<any> {
    let actualUrl = this.baseURL + '/Users/' + this.activeUserData.userId;
    const headers = { 'content-type': 'application/json' };
    console.log(updatedUser);
    return this.http.put<any>(actualUrl, JSON.stringify(updatedUser), {
      headers: headers,
    });
  }

  createNewTemporaryCart(userId: number) {
    this.activeShoppingCartData = new TemporaryShoppingCart();

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
    this.activeShoppingCartData = new TemporaryShoppingCart();
  }

  calculateTotal(shoppingCart: TemporaryShoppingCart): number {
    let total: number = 0;
    if (shoppingCart.productsShoppingCart) {
      shoppingCart.productsShoppingCart.forEach((orderItem) => {
        total += orderItem.amount * orderItem.product.price;
      });
    }
    return total;
  }
}
