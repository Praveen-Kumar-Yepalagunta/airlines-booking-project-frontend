import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
// import { UserResponse } from '../dtos/userResponse';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users!: User;

  // userEmail: string = '';
  // email: string = '';
  isPageLoaded: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUserByEmail(this.email);
  }

  email = UserService.user.email ? UserService.user.email : '';
  getUserByEmail(email: string): void {
    this.userService.getUserByEmail(email).subscribe(
      (data: User) => {
        this.users = data;
        // console.log(this.users);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // update user
  editingUser: boolean = false;

  onUpdateUser(): void {
    this.toggleEditingUser();
    this.userService.updateUserByEmail(this.email, this.users).subscribe(
      (updatedUser) => {
        console.log(this.email, this.users);
        // this.toggleEditingUser(); // toggle back to display mode after updating
        alert('User updated successfully');
        // redirect to login if only email updated, to relog again
        if (this.email !== this.users.email) {
          this.userService.logOutUser();

          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.error('Error updating user:', error);
        alert('User Update Failed');
      }
    );
  }

  toggleEditingUser(): void {
    this.editingUser = !this.editingUser;
  }
}
