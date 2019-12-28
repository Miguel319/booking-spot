import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { CustomError } from "src/app/models/custom.error.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  user: User;
  customError: CustomError;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
  }

  cleanError() {
    if (this.customError) this.customError = undefined;
  }

  createForm() {
    this.formGroup = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }

  login() {
    if (this.formGroup.valid) {
      this.user = { ...this.formGroup.value };

      this.authService.login(this.user).subscribe(
        () => this.router.navigateByUrl("/rentals"),
        err =>
          (this.customError = new CustomError(
            err.error.title,
            err.error.message
          ))
      );
    }
  }
}
