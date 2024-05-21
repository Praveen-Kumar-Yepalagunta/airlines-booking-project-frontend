import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from 'src/app/models/booking.model';
import { Flight } from 'src/app/models/flight.model';
import { BookingService } from 'src/app/services/booking.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  bookings: Booking[] = [];

  constructor(
    private bookingService: BookingService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.getBookingsByEmail(this.email);
  }

  email = UserService.user.email ? UserService.user.email : '';

  getBookingsByEmail(email: string): void {
    console.log(email);
    this.bookingService.getBookingsByEmail(email).subscribe(
      (data: Booking[]) => {
        this.bookings = data;
        console.log('Booked Flights: ', { data });
      },
      (error) => {
        console.error('Error fetching bookings:', error);
      }
    );
  }
}
