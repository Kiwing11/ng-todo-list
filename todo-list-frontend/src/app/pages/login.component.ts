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
import { AuthService } from "src/app/user/services/auth.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  template: ` <div class="container mx-auto p-4 shadow-md rounded">
    <h5 class="text-xl mb-4 font-bold text-gray-900">Log in to your account</h5>
    <form
      [formGroup]="loginForm"
      (ngSubmit)="onSubmit()"
      autocomplete="off"
      novalidate
    >
      <div class="form-group mb-3 flex flex-col">
        <label for="email-input" class="font-medium mb-1">Email Address:</label>
        <input
          name="email-input"
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
        <span class="form-error text-red-500">Email Address is required.</span>
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
          name="password-input"
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

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {},
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
