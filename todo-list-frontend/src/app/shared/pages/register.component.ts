import { NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "src/app/auth/services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  template: ` @if(showErrorAlert){
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
      <h5 class="text-xl mb-4 font-bold text-gray-900">Sign up</h5>
      <form
        [formGroup]="registerForm"
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
                registerForm.get('email')?.hasError('required') &&
                registerForm.get('email')?.touched,
              valid: registerForm.get('email')?.valid
            }"
          />
          @if (registerForm.get('email')?.hasError('required') &&
          registerForm.get('email')?.touched) {
          <span class="form-error text-red-500"
            >Email Address is required.</span
          >
          }@else if(registerForm.get('email')?.touched &&
          registerForm.get('email')?.invalid ){
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
                registerForm.get('password')?.hasError('required') &&
                registerForm.get('password')?.touched,
              valid: registerForm.get('password')?.valid
            }"
          />
          @if (registerForm.get('password')?.hasError('required') &&
          registerForm.get('password')?.touched) {
          <span class="form-error text-red-500 ">Password is required.</span>
          }@else if(registerForm.get('password')?.touched &&
          registerForm.get('password')?.hasError('minlength') ){
          <span class="form-error text-red-500 "
            >Password must be at least 3 letters long</span
          >
          }
        </div>
        <button
          class="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
        <p class="mb-0 mt-2 pt-1 text-sm font-semibold">
          Already have an account?
          <a
            routerLink="/login"
            class="text-danger hover:underline cursor-pointer transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
            >Log in</a
          >
        </p>
      </form>
    </div>`,
})
export class RegisterComponent {
  registerForm!: FormGroup;
  alertMessage = "";
  showErrorAlert = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.alertMessage = response.message || "Registration Successful";
          this.router.navigate(["/login"]);
        },
        error: (err) => {
          this.alertMessage = err.error.message || "Registration failed";
          this.showErrorAlert = true;
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
