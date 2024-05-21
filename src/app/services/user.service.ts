import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api'; // base URL
  public static isUserAuthenticated: boolean = false;
  public static isAdminAuthenticated: boolean = false;
  public static user: User = {};

  public static userId = UserService.user.userId;

  public static isAdminEndPoint = false;
  constructor(private http: HttpClient, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        UserService.isAdminEndPoint = event.url == '/adminLogin';
      }
    });
  }

  login(email: string, password: string): Observable<any> {
    console.log('login');
    const loginData = { email: email, password: password };
    // console.log(loginData)
    const response = this.http.post<any>(`${this.baseUrl}/login`, loginData);
    response.subscribe((data) => {
      if ((data.message = 'User Login successful')) {
        UserService.isUserAuthenticated = true;

        this.getUserByEmail(email).subscribe((result) => {
          UserService.user = result;
          // console.log(UserService.user);
          this.router.navigate(['/flights']);
        });
      } else {
        UserService.isUserAuthenticated = false;
      }
    });
    return response;
  }

  AdminLogin(email: string, password: string): Observable<any> {
    console.log('login');
    const loginData = { email: email, password: password };
    // console.log(`${this.baseUrl}/login`)
    // console.log(loginData)
    const response = this.http.post<any>(
      `${this.baseUrl}/adminLogin`,
      loginData
    );
    response.subscribe((data) => {
      if (data.status == 'OK') {
        UserService.isUserAuthenticated = true;
        this.getUserByEmail(email).subscribe((result) => {
          UserService.user = result;

          // console.log(UserService.user);
        });
      } else UserService.isUserAuthenticated = false;
    });
    return response;
  }

  logOutUser() {
    UserService.isUserAuthenticated = false;
  }

  register(
    firstName: string,
    lastName: string,
    password: string,
    email: string
  ): Observable<any> {
    const userData = { firstName, lastName, password, email };
    return this.http.post<any>(`${this.baseUrl}/register`, userData);
  }

  //////////////
  email = UserService.user.email ? UserService.user.email : '';

  getUserByEmail(email: string): Observable<User> {
    const url = `${this.baseUrl}/users/getUserByEmail?email=${email}`;
    return this.http.get<User>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
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

  // update user
  updateUserByEmail(email: string, users: User): Observable<String> {
    const url = `${this.baseUrl}/users/updateUserByEmail/${email}`;
    return this.http.put<String>(url, users);
  }
}
