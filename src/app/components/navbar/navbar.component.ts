import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  currentUser: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    if (!this.isUserLoggedIn()) return;

    this.authService
      .getLoggedInUser()
      .subscribe(res => (this.currentUser = res["name"]));
  }

  isUserLoggedIn() {
    return this.authService.isUserLoggedIn();
  }

  logoutUser() {
    this.currentUser = "";
    this.authService.logout();
    this.router.navigateByUrl("/rentals");
  }
}
