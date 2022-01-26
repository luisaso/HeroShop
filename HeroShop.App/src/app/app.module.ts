import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ManageProductComponent } from './admin-profile/manage-product/manage-product.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    LoginComponent,
    UserProfileComponent,
    AdminProfileComponent,
    ShoppingCartComponent,
    ManageProductComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: 'products',
        component: ProductListComponent,
      },
      {
        path: 'products/:id',
        component: ProductDetailComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'user/:id',
        component: UserProfileComponent,
      },
      {
        path: 'user/:id/shoppingcart',
        component: ShoppingCartComponent,
      },
      {
        path: 'admin',
        component: AdminProfileComponent,
      },
      {
        path: 'admin/manageproduct',
        component: ManageProductComponent,
      },
      {
        path: 'welcome',
        redirectTo: 'products',
        pathMatch: 'full',
      },
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'products',
        pathMatch: 'full',
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
