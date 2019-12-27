import { Rental } from "./rental.model";

export class User {
  _id: number;
  email: string;
  password: string;
  username?: string;
  passwordConfirmation?: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: string;
  rentals?: Rental[];
  createdAt?: Date;
}
