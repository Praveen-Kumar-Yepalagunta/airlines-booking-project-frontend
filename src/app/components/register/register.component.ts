import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  password: string = '';
  email: string = '';
  // not in entity
  confirmPassword: string = '';

  containsUppercase: boolean = false;
  containsLowercase: boolean = false;
  containsNumber: boolean = false;
  containsSpecialChar: boolean = false;

  checkPassword() {
    this.containsUppercase = /[A-Z]/.test(this.password);
    this.containsLowercase = /[a-z]/.test(this.password);
    this.containsNumber = /\d/.test(this.password);
    this.containsSpecialChar = /[@$!%*?&]/.test(this.password);
  }

  emailPattern: string = '^[^\\s@]+@[^\\s@]+\\.[^\\s@]{1,}$';

  constructor(private userService: UserService, private router: Router) {}

  isConfirmPasswordEqual: boolean = false;

  onSubmit(): void {
    this.userService
      .register(this.firstName, this.lastName, this.password, this.email)
      .subscribe(
        (response) => {
          console.log('Registration Successful');
          this.router.navigate(['/login']);

          // console.log("printing backend reponse ",response);
        },
        (error) => {
          console.error('Registration failed');
        }
      );
  }

  confirmPasswordValue(): void {
    if (this.password != this.confirmPassword) {
      this.isConfirmPasswordEqual = false;
      //console.log(this.isConfirmPasswordEqual);
    } else this.isConfirmPasswordEqual = true;
  }
}
