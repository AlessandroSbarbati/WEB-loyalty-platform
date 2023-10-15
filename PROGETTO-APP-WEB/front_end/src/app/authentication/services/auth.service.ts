import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from "src/environments/environments";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient, private router: Router) { }

  //metodo che salva i token
  saveToken(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    console.log("Access Token : " + accessToken + "\nRefreshToken : " + refreshToken);
  }

  //metodo per richiedere un refresh token user
  refreshTokenUser() {
    const refreshToken = localStorage.getItem('refreshToken');
    console.log("Sono dentro al metodo refresh, con token :" + refreshToken);
    return this.http.post(`${enviroment.baseUrl}/user/refreshToken`, { refreshToken });
  }

  //metodo per richiedere un refresh token employee
  refreshTokenEmployee() {
    const refreshToken = localStorage.getItem('refreshToken');
    console.log("Sono dentro al metodo refresh, con token :" + refreshToken);
    return this.http.post(`${enviroment.baseUrl}/employee/refreshToken`, { refreshToken });
  }


  
  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}