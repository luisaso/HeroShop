import { Component, OnDestroy, OnInit } from '@angular/core';
import { DbCallsService } from '../shared/db-calls.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit, OnDestroy {
  constructor(private service: DbCallsService) {}

  user: User = new User();

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  isLoggedIn(): boolean {
    return this.user.userId != null;
  }
  onLogout() {
    this.user = new User();
  }
}
