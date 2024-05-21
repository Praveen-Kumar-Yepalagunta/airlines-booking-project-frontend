export class User {
  userId?: number;
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
}

export type UserRequest = Omit<User, 'flightId'>;
