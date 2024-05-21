import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Booking } from '../models/booking.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = 'http://localhost:8080/api/bookings';

  constructor(private http: HttpClient, private router: Router) {}

  getBookingsByEmail(email: string): Observable<Booking[]> {
    const url = `${this.apiUrl}/getBookingsByEmail?email=${email}`;
    return this.http.get<Booking[]>(url).pipe(catchError(this.HandleError));
  }

  private HandleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  getUserIdByEmail(email: string): Observable<number> {
    return this.http.get<number>(
      `${this.apiUrl}/getUserIdByEmail?email=${email}`
    );
  }

  saveSeats(
    fetchedUserId: number,
    flightId: number,
    seatsBooked: number
  ): Observable<any> {
    const url = `${this.apiUrl}/bookSeats/${fetchedUserId}/${flightId}/${seatsBooked}`;
    const requetData = { fetchedUserId, flightId, seatsBooked };
    return this.http.post<any>(url, { requetData });
  }
}
