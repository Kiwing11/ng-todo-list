import { NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { RouterLink } from "@angular/router";
import { AuthService } from "src/app/auth/services/auth.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  template: `@if(showErrorAlert){
    <div
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-3 rounded relative"
      role="alert"
    >
      <strong class="font-bold">{{ alertMessage }}</strong>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg
          class="fill-current h-6 w-6 text-red-500"
          role="button"
          (click)="showErrorAlert = false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path
            d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
          />
        </svg>
      </span>
    </div>
    }
    <div class="container mx-auto p-4 shadow-md rounded">
      <h5 class="text-xl mb-4 font-bold text-gray-900">
        Log in to your account
      </h5>
      <form
        [formGroup]="loginForm"
        (ngSubmit)="onSubmit()"
        autocomplete="off"
        novalidate
      >
        <div class="form-group mb-3 flex flex-col">
          <label for="email-input" class="font-medium mb-1"
            >Email Address:</label
          >
          <input
            id="email-input"
            type="text"
            placeholder="Email Address"
            class="form-control border border-gray-300 px-3 py-2 rounded focus:ring focus:ring-blue-300"
            formControlName="email"
            [class]="{
              invalid:
                loginForm.get('email')?.hasError('required') &&
                loginForm.get('email')?.touched,
              valid: loginForm.get('email')?.valid
            }"
          />
          @if (loginForm.get('email')?.hasError('required') &&
          loginForm.get('email')?.touched) {
          <span class="form-error text-red-500"
            >Email Address is required.</span
          >
          }@else if(loginForm.get('email')?.touched &&
          loginForm.get('email')?.invalid ){
          <span class="form-error text-red-500 "
            >Please enter a valid email address.</span
          >
          }
        </div>
        <div class="form-group mb-3 flex flex-col">
          <label for="password-input" class="font-medium mb-1">Password:</label>
          <input
            id="password-input"
            type="password"
            placeholder="Password"
            class="form-control border border-gray-300 px-3 py-2 rounded focus:ring focus:ring-blue-300"
            formControlName="password"
            [class]="{
              invalid:
                loginForm.get('password')?.hasError('required') &&
                loginForm.get('password')?.touched,
              valid: loginForm.get('password')?.valid
            }"
          />
          @if (loginForm.get('password')?.hasError('required') &&
          loginForm.get('password')?.touched) {
          <span class="form-error text-red-500 ">Password is required.</span>
          }
        </div>
        <button
          class="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
        <p class="mb-0 mt-2 pt-1 text-sm font-semibold">
          Don't have an account?
          <a
            routerLink="/register"
            class="text-danger hover:underline cursor-pointer transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
            >Register</a
          >
        </p>
      </form>
    </div>`,
})
export class LoginComponent {
  loginForm!: FormGroup;
  alertMessage = "";
  showErrorAlert = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.alertMessage = response.message || "Logged in";
        },
        error: (err) => {
          this.alertMessage = err.error.message || "Failed to login";
          this.showErrorAlert = true;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
