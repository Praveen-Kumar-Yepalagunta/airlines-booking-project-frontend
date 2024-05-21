import { User } from './user.model';
import { Flight } from './flight.model';

export class Booking {
  bookingId: number;
  user: User;
  flight: Flight;
  seatsBooked: number;
  totalPrice: number;

  constructor(
    bookingId: number,
    user: User,
    flight: Flight,
    seatsBooked: number,
    totalPrice: number
  ) {
    this.bookingId = bookingId;
    this.user = user;
    this.flight = flight;
    this.seatsBooked = seatsBooked;
    this.totalPrice = totalPrice;
  }
}
