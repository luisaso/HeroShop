import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DbCallsService } from '../shared/db-calls.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private service: DbCallsService) {}

  username!: string;
  password!: string;
  subLogin!: Subscription;
  subCreate!: Subscription;

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subLogin.unsubscribe();
  }

  verifyLogin() {
    this.subLogin = this.service
      .verifyUserLogin(this.username, this.password)
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res != null) {
            this.loggedIn();
          }
        },
      });
  }

  loggedIn() {
    console.log('Logged In');
  }

  saveToCreate() {
    this.subCreate = this.service
      .postNewUser(this.username, this.password)
      .subscribe((res) => {
        next: {
          console.log('User Added');
          console.log(res);
        }
      });
  }
}
