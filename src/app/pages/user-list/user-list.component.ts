import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login/login.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  isLoggedIn = false;
  users: any[] = [];

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.userData.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.loadUsers();
      }
    });
  }

  loadUsers() {
    this.loginService.getUsers().subscribe((users) => {
      this.users = users.data;
    });
  }
}
