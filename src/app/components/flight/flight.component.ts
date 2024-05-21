import { Component, Input, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Flight, flightResponse1 } from 'src/app/models/flight.model';
import { User } from 'src/app/models/user.model';
import { BookingService } from 'src/app/services/booking.service';
import { FlightService } from 'src/app/services/flight.service';
import { UserService } from 'src/app/services/user.service';
// import { FlightResponse } from '../dtos/flightResponse';
import { Booking } from 'src/app/models/booking.model';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css'],
})
export class FlightComponent implements OnInit {
  // [x: string]: any;
  flights: Flight[] = [];
  flightAdd!: flightResponse1;

  searchParams = {
    departure: '',
    arrival: '',
    departureDateTime: '',
  };

  isAdminEndPoint = UserService.isAdminEndPoint;

  constructor(
    private flightService: FlightService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.loadFlights();
    this.getUserIdByEmail(this.email);
  }
  loadFlights(): void {
    //   if searchParams are empty load all flights else load filtered flights
    if (
      Object.values(this.searchParams).every(
        (param) => param === null || param === ''
      )
    ) {
      this.flightService.getAllFlights().subscribe(
        (data) => {
          this.flights = data;
          console.log('All Flights:', this.flights);
        },
        (error) => {
          console.error('Error fetching flights:', error);
        }
      );
    } else {
      this.flightService.getFilteredFlights(this.searchParams).subscribe(
        (data) => {
          this.flights = data;
          console.log('Filtered Flights:', this.flights);
        },
        (error) => {
          console.error('Error fetching filtered flights:', error);
        }
      );
    }
  }

  onSearch(): void {
    this.loadFlights();
  }

  OnBookNowClick(): any {
    if (UserService.isUserAuthenticated) {
      console.log('in onbookclick');
      this.router.navigate(['/flights']);
    } else {
      console.log('please login to book');
      this.router.navigate(['/login']);
    }
  }

  isUserLoggedIn = UserService.isUserAuthenticated;

  onConfirmBookingClick(flightId: number, seatsBooked: number): void {
    console.log(
      'Confirm booking for flight with ID:',
      flightId,
      'and seats:',
      seatsBooked
    );
    if (!seatsBooked) return;
    // Call the flight service to update available seats passing flightId and seatsRequired
    this.flightService.updateAvailableSeats(flightId, seatsBooked).subscribe(
      () => {
        console.log('Available seats updated successfully');
        this.loadFlights();
        this.seatsBookedList = [];

        this.router.navigate(['/booking']);
        alert('Seats Booking Success');
      },
      (error) => {
        console.error('Failed to update available seats:', error);
        alert('Seats Booking Failed');
      }
    );
  }

  seatsBookedList: number[] = [];

  initializeSeatsBookedList(): void {
    this.seatsBookedList = new Array(this.flights.length).fill(0);
  }
  setSeatsBooked(index: number, value: number): void {
    this.seatsBookedList[index] = value;
  }

  onDepartureChange(value: string) {
    this.searchParams.departure = value.toUpperCase();
    // this.onSearch();
  }
  onArrivalChange(value: string) {
    this.searchParams.arrival = value.toUpperCase();
    // this.onSearch();
  }

  flightNumber!: string;
  departure!: string;
  arrival!: string;
  departureDateTime!: string;
  ticketPrice!: number;
  seatsAvailable!: number;

  public static isAdminPage: boolean = false;
  createFlight(): void {
    const flightData = {
      flightNumber: this.flightNumber,
      departure: this.departure,
      arrival: this.arrival,
      departureDateTime: this.departureDateTime,
      ticketPrice: this.ticketPrice,
      seatsAvailable: this.seatsAvailable,
    };
    this.flightService.createFlight(flightData).subscribe(
      (newFlight: flightResponse1) => {
        console.log('New Flight created:', newFlight);
        FlightComponent.isAdminPage = true;
        alert('Flight created successfully');
      },
      (error) => {
        console.error('Error creating flight:', error);
        alert('Flight creation failed! Same Flight may be present already');
      }
    );
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form submitted:', form.value);
    } else {
      console.log('Please provide all fields');
    }
  }

  email = UserService.user.email ? UserService.user.email : ''; // one form ternery operator which assigns value if UserService.user.email exists otherwise assigns empty string
  getUserIdByEmail(email: string): void {
    if (email) {
      this.bookingService.getUserIdByEmail(email).subscribe(
        (userId) => {
          userId = userId;
          console.log('User ID:', userId);
          UserService.userId = Number(userId);
        },
        (error) => {
          console.error('Error fetching user ID:', error);
        }
      );
    }
  }

  saveSeats(flightId: number, seatsBooked: number): void {
    const userId = UserService.userId;

    if (!userId) {
      console.error('Error: User ID not available');
      return;
    }
    this.bookingService.saveSeats(userId, flightId, seatsBooked).subscribe(
      (response) => {
        //   if (response.error) {
        //     // alert(`Error: ${response.error}`);
        //     alert('Seats Booking Failed'); // using template string syntax which allows embedded expressions or values for printing  with string
        //   } else {
        //     // alert(`Message: ${response.message}`);
        //     alert('Seats Booking Success');
        //   }
        // },
        console.log('Seats Booked Successfully');
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
