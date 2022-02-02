import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DbCallsService } from '../shared/db-calls.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private service: DbCallsService,
    private router: Router,
    private toastr: ToastrService
  ) {}

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
    if (this.subCreateCart) this.subCreateCart.unsubscribe();
    if (this.subShopCart) this.subShopCart.unsubscribe();
  }

  verifyLogin() {
    this.subLogin = this.service
      .verifyUserLogin(this.username, this.password)
      .subscribe({
        next: (res) => {
          if (res != null) {
            this.service.activeUserData = res;
            this.loggedIn(res.userId!);
          } else {
            this.toastr.error('Username or password incorrect');
          }
        },
      });
  }

  loggedIn(userId: number) {
    this.service.createNewTemporaryCart(userId);
    this.router.navigate(['/products']);
    this.toastr.success('Logged In');
  }

  saveToCreateUser() {
    this.subCreateUser = this.service
      .postNewUser(this.username, this.password)
      .subscribe((res) => {
        next: {
          this.service.activeUserData = res;
          this.service.createNewTemporaryCart(res.userId!);
          this.toastr.success('New Account Created');
          this.router.navigate(['/user/', this.service.activeUserData.userId]);
        }
      });
  }
}
