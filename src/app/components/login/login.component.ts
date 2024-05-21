import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  emailPattern: string = '^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$';

  loginMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onLogin() {
    this.userService.login(this.email, this.password).subscribe(
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
