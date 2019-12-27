import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post("/api/v1/auth/signup", user) as Observable<User>;
  }
}
