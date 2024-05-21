import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight, flightResponse1 } from '../models/flight.model';
// import { FlightResponse } from '../components/dtos/flightResponse';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getAllFlights(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/flights/getAllFlights`);
  }

  getFilteredFlights(params: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/flights/search`, { params });
  }

  updateAvailableSeats(flightId: number, seatsBooked: number): Observable<any> {
    const url = `${this.baseUrl}/flights/${flightId}/updateSeats?seatsBooked=${seatsBooked}`;
    return this.http.put(url, null);
  }

  createBookings(flightId: number, seatsBooked: number): Observable<any> {
    const url = `${this.baseUrl}/bookings/book`;
    const body = {
      // userId: userId,
      flightId: flightId,
      seatsBooked: seatsBooked,
    };

    return this.http.post(url, body);
  }

  createFlight(flightData: flightResponse1): Observable<flightResponse1> {
    const url = `${this.baseUrl}/flights/createFlight`;
    return this.http.post<Flight>(url, flightData);
  }
}
