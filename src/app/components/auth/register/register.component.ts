import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { CustomError } from "src/app/models/custom.error.model";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  userData: User;
  customError: CustomError;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userData = new User();
  }

  cleanError() {
    if (this.customError) this.customError = undefined;
  }

  register() {
    this.authService.register(this.userData).subscribe(
      data => {
        console.log(data);

        // this.router.navigateByUrl(`/rentals`);
      },
      err =>
        (this.customError = new CustomError(err.error.title, err.error.message))
    );
    console.log(this.userData);
  }
}
