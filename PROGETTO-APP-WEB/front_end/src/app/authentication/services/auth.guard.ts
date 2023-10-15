import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UserService } from "src/app/service/user.service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {



constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  
    
   
 //controlla token per il permesso alla rotta
canActivate(): boolean {
    if (!this.authService.isAuthenticated() || this.userService.getUser() == null) {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}