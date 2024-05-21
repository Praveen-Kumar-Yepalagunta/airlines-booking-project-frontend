import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  email: string = '';
  password: string = '';

  emailPattern: string = '^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$';

  loginMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onAdminLogin() {
    this.userService.AdminLogin(this.email, this.password).subscribe(
      (response) => {
        //console.log('Login successful!', response);
        this.router.navigate(['/flights']);
      },
      (error) => {
        this.loginMessage = 'Login Failed';
        //console.error('Login failed!', error);
      }
    );
  }
}
