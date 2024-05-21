export class Flight {
  flightId!: number;
  flightNumber!: string;
  departure!: string;
  arrival!: string;
  departureDateTime!: string;
  ticketPrice!: number;
  seatsAvailable!: number;
}

export type flightResponse1 = Omit<Flight, 'flightId'>;
