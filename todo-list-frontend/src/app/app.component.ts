import { Component, inject } from "@angular/core";
import { TaskListPageComponent } from "./task/task-list.page.component";
import { TasksStateService } from "./task/services/tasks.state.service";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { NavComponent } from "./shared/layouts/nav/nav.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    TaskListPageComponent,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    NavComponent,
  ],
  template: `
    <main class="mt-4">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [],
})
export class AppComponent {
  title = "todo-list";
}
