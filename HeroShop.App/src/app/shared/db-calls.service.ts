import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from './user.model';
import { Product } from './product.model';
import { ShoppingCart } from './shopping-cart.model';
import { ProductShoppingCart } from './product-shopping-cart.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DbCallsService {
  constructor(private http: HttpClient) {}

  readonly baseURL = 'http://localhost:5287/api';

  activeUserData: User = new User();
  activeShoppingCartData: ShoppingCart = new ShoppingCart();

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
    let actualUrl = this.baseURL + '/Users/' + userId + 'ShoppingCart';
    return this.http.get<ShoppingCart>(actualUrl);
  }

  postNewUser(username: string, password: string): Observable<User> {
    let actualUrl = this.baseURL + '/Users/';
    const headers = { 'content-type': 'application/json' };
    let newUser: User = new User();
    newUser.admin = false;
    newUser.password = password;
    newUser.username = username;
    console.log(newUser);
    return this.http.post<User>(actualUrl, JSON.stringify(newUser), {
      headers: headers,
    });
  }

  verifyUserLogin(username: string, password: string): Observable<User> {
    let actualUrl = this.baseURL + '/Users/' + username + '/' + password;
    return this.http.get<User>(actualUrl);
  }
}
