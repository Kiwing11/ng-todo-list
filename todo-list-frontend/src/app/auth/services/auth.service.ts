import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable, inject } from "@angular/core";
import { ILogin, ILoginResponse, IRegisterResponse } from "../models/auth";
import { apiEndpoint } from "../constants/constants";
import { catchError, map, throwError } from "rxjs";
import { TokenService } from "./token.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private router = inject(Router);
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  login(data: ILogin) {
    return this.http
      .post<ILoginResponse>(`${apiEndpoint.AuthEndpoint.login}`, data)
      .pipe(
        map((response) => {
          if (response) {
            this.tokenService.setToken(response.accessToken);
          }
          return response;
        })
      );
  }

  logout() {
    this.http.post(`${apiEndpoint.AuthEndpoint.logout}`, "").subscribe({
      next: (response) => {
        this.tokenService.removeToken();
        this.router.navigate(["/login"]);
      },
    });
  }

  register(userData: ILogin) {
    return this.http
      .post<IRegisterResponse>(`${apiEndpoint.AuthEndpoint.register}`, userData)
      .pipe();
  }
}
