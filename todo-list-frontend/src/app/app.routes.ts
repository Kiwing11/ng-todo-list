import { Routes } from "@angular/router";
import { TaskListPageComponent } from "./task/task-list.page.component";
import { DefaultComponent } from "./shared/layouts/default/default.component";
import { guestGuard } from "./auth/guard/guest.guard";
import { LoginComponent } from "./shared/pages/login.component";
import { authGuard } from "./auth/guard/auth.guard";
import { MasterComponent } from "./shared/layouts/master/master.component";
import { RegisterComponent } from "./shared/pages/register.component";
import { LandingPageComponent } from "./shared/pages/landing.page.component";

export const routes: Routes = [
  {
    path: "",
    component: DefaultComponent,
    canActivate: [guestGuard],
    children: [
      { path: "", component: LandingPageComponent },
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
    ],
  },
  {
    path: "",
    component: MasterComponent,
    canActivate: [authGuard],
    children: [{ path: "tasks", component: TaskListPageComponent }],
  },
  {
    path: "**",
    redirectTo: "",
  },
];
