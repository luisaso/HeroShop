import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DbCallsService } from '../shared/db-calls.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  constructor(private service: DbCallsService, private toastr: ToastrService) {}

  auxRaces = ['Human', 'Orc', 'Elf', 'Dwarf', 'God', 'Other'];
  auxGenders = ['Male', 'Female', 'Other'];
  temporaryUser: User = new User();
  subUpdateUser!: Subscription;

  ngOnInit(): void {
    this.temporaryUser = this.service.activeUserData;
  }

  ngOnDestroy(): void {
    if (this.subUpdateUser) this.subUpdateUser.unsubscribe();
  }

  saveChanges() {
    this.subUpdateUser = this.service.updateUser(this.temporaryUser).subscribe({
      next: (res) => {
        this.toastr.success('Changes Saved');
      },
    });
  }
}
