import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, from } from "rxjs";
import { User } from "../models/user.model";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private jwt = new JwtHelperService();
  private decodedToken: string;

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post("/api/v1/auth/signup", user) as Observable<User>;
  }

  login(user: User): Observable<any> {
    return this.http
      .post("/api/v1/auth/signin", user)
      .pipe(map(res => this.saveToken(res["token"])));
  }

  getLoggedInUser() {
    const token = localStorage.getItem("token");

    console.log(token);

    let headers = new HttpHeaders();

    headers = headers.set("Application-Type", "application/json");
    headers = headers.set("Authorization", `Bearer ${token}`);

    return this.http.get("api/v1/auth/currentUser", { headers: headers });
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    this.decodedToken = undefined;
  }

  private saveToken(token: string): string {
    this.decodedToken = this.jwt.decodeToken(token);

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(this.decodedToken));
    return token;
  }

  isUserLoggedIn(): boolean {
    const token = localStorage.getItem("token");
    return !this.jwt.isTokenExpired(token);
  }
}
