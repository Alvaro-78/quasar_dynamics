import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login/login.component';

@Component({
  selector: 'app-user-list',
  template: `
    <div *ngIf="isLoggedIn">
      <h2>Lista de Usuarios</h2>
      <ul>
        <li *ngFor="let user of users">
          {{ user.first_name }} {{ user.last_name }}
        </li>
      </ul>
    </div>
  `,
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
