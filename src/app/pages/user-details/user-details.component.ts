import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login/login.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: any;

  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('id');
      this.loadUserDetails(userId);
    });
  }

  private loadUserDetails(userId: string | null) {
    if (userId) {
      this.loginService.getUserById(userId).subscribe(
        (user) => {
          this.user = user.data;
        },
        (error) => {
          console.error('Error al cargar detalles del usuario', error);
        }
      );
    }
  }
}
