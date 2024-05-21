import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';
import { FlightService } from 'src/app/services/flight.service';
import { UserService } from 'src/app/services/user.service';
import { FlightComponent } from '../flight/flight.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  [x: string]: any;
  isUserLoggedIn: boolean = UserService.isUserAuthenticated;
  isAdminLoggedIn: boolean = UserService.isAdminAuthenticated;
  // isAdminLoggedIn: boolean = AdminService.isAdminAuthenticated;
  isAdminEndPoint: boolean = false;

  isAdminPage: boolean = FlightComponent.isAdminPage;
  constructor(private userService: UserService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isAdminEndPoint = event.url == '/adminLogin';
      }
    });
  }

  ngOnInit(): void {
    //console.log(UserService.isUserAuthenticated);
    this.router.events.subscribe((event) => {
      // console.log(this.isUserLoggedIn);
      // check the status of login everytime when route changes which used for ng directives hidding dynamically
      if (event.constructor.name === 'NavigationEnd') {
        this.isUserLoggedIn = UserService.isUserAuthenticated;
      }
    });
  }

  logout(): any {
    this.userService.logOutUser();
  }

  isProfileClicked: boolean = false;
  toggleCard() {
    this.isProfileClicked = !this.isProfileClicked;
  }
}
