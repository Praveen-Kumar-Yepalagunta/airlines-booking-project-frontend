# AirlinesBookingProjectFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# TECHNOLOGIES USED

# Frontend

1. Angular in frontend (NODE 18.17.1 running, NPM 9.6.9 running )
2. Bootstrap for layout and styles

# Backend

1. Springboot in backend with JPARepository for talking with database (JAVA 17, SPRINGBOOT 3.2.0)

# Database

1. H2 In-Memory db for database (used for fast development not used in production) with data.sql file with sample data
2. 3 Tables Individual and 1 Table Combined
   User (Individual)
   Admin (Individual)
   Flight (Individual)
   Booking (Combined using entity relations)

# Testing Api

1. Postman

# Frontend Concepts Used

1. Login status with backend login api response (used separate login and admin controllers with same service)
2. Directives
3. Data binding (Interpolation, Property, Event)
4. Routing with AppRoutingModule
5. Guarding (CanActive)
6. BrowserModule gives features and services necessary for browser based applications
7. Template driven forms with FormsModule
8. Http apis with HttpClientModule
9. Click events to call the methods in component when clicked
10. Response and Error based errors Handling
11. Basic alerts
12. Rxjs Observables for APIs
13. Router navigate, href based navigates

# Backend Concepts Used

1. JPA Repository
2. DTOs
3. Entity relations (ManyToOne)
4. Data.sql for sample data
5. RequestParam Endpoints
6. PathParam Endpoints
7. RequestBody Endpoints
8. Used CRUD Methods
9. CorsFilter for the prevention of CORS ERROR or making frontend and backend endpoints to talk. (Giving access)
10. ResponseEntity for Return type which gives custom status codes and messages to print
11. Used Static nested classes sometimes for custom response other than present entity types for security reasons
12. Optional concept to avoid null value exception directly
13. Exception class used for custom string at combined controller related need (booking realted)

# Backend Api Endpoints that are used in frontend

1. POST: http://localhost:8080/api/login
2. POST: http://localhost:8080/api/adminLogin
3. POST: http://localhost:8080/api/register
4. GET: http://localhost:8080/api/flights/search?departure=DELHI&arrival=MUMBAI&departureDateTime=2023-12-15T08:00:00
5. GET: http://localhost:8080/api/flights/getAllFlights
6. POST: http://localhost:8080/api/bookings/bookSeats/{userId}/{flightId}/{seatsBooked}
7. GET: http://localhost:8080/api/users/getUserByEmail?email=mark@gmail.com
8. POST: http://localhost:8080/api/flights/createFlight
9. PUT: http://localhost:8080/api/users/updateUserByEmail/mark@gmail.com
10. PUT: http://localhost:8080/api/flights/admin/updateFlightById/1
11. PUT: http://localhost:8080/api/flights/1/updateSeats?seatsBooked=10
