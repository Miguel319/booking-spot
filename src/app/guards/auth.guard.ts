import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  private url: string;

  constructor(private authService: AuthService, private router: Router) {}

  private handleAuth(): boolean {
    if (!this.isLoginOrRegister()) return true;

    this.router.navigateByUrl("/rentals");
    return false;
  }

  private handleNoAuth(): boolean {
    if (this.isLoginOrRegister()) return true;

    this.router.navigateByUrl("/auth/login");
    return false;
  }

  private isLoginOrRegister(): boolean {
    return this.url.includes("auth");
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.url = state.url;

    if (this.authService.isUserLoggedIn()) return this.handleAuth();

    return this.handleNoAuth();
  }
}
