import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login/login.component';
import { User } from 'src/app/services/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  userLoginOn: boolean = true;
  users: User[] = [];

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.currentUserLogin.subscribe((userLoginOn) => {
      console.log('Estado de inicio de sesión:', userLoginOn);
      this.userLoginOn = userLoginOn;
      if (userLoginOn) {
        this.loadUsers(1);
        this.loadUsers(2);
      }
    });
  }

  private loadUsers(page: number) {
    this.loginService.getUsers(page).subscribe(
      (data) => {
        this.users = this.users.concat(data.data); // Concatena los usuarios de cada página
      },
      (error) => {
        console.error('Error al cargar usuarios', error);
      }
    );
  }
}
