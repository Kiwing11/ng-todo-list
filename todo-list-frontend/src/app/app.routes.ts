import { Routes } from "@angular/router";
import { TaskListPageComponent } from "./task/task-list.page.component";
import { DefaultComponent } from "./shared/layouts/default/default.component";
import { guestGuard } from "./user/guard/guest.guard";
import { LoginComponent } from "./pages/login.component";
import { AppComponent } from "./app.component";
import { authGuard } from "./user/guard/auth.guard";
import { MasterComponent } from "./shared/layouts/master/master.component";
import { RegisterComponent } from "./pages/register.component";
import { LandingPageComponent } from "./pages/landing.page.component";

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
  // {
  //   path: "tasks",
  //   title: "Tasks",
  //   component: TaskListPageComponent,
  // },
  // {
  //   path: "**",
  //   redirectTo: "tasks",
  // },
];
