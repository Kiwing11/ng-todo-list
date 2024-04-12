import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { TasksStateService } from "src/app/task/services/tasks.state.service";
import { AuthService } from "src/app/auth/services/auth.service";
import { TokenService } from "src/app/auth/services/token.service";

@Component({
  selector: "app-nav",
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink],
  template: `
    <nav class="bg-blue-500 py-4 mb-2 flex justify-between items-center">
      @if(this.isAuthenticated$ | async) {
      <div>
        <a
          class="mx-10 text-white font-semibold hover:underline text-xl"
          routerLink="/tasks"
          routerLinkActive="font-bold"
          [routerLinkActiveOptions]="{ exact: true }"
        >
          Tasks ({{ undoneCount }})
        </a>
      </div>
      }
      <div
        class="ml-auto pr-5 text-white font-semibold hover:underline text-xl"
      >
        @if (this.isAuthenticated$ | async) {
        <div class="mx-10 font-medium cursor-pointer" (click)="onLogout()">
          Logout
        </div>
        }@else {
        <div class="mx-10 font-medium cursor-pointer" routerLink="/login">
          Login
        </div>
        }
      </div>
    </nav>
  `,
  styles: ``,
})
export class NavComponent {
  isAuthenticated$: BehaviorSubject<boolean>;

  private tokenService = inject(TokenService);
  private authService = inject(AuthService);
  tasksStateService = inject(TasksStateService);
  undoneCount = 0;
  constructor() {
    this.isAuthenticated$ = this.tokenService.isAuthentication;
  }

  ngOnInit() {
    this.tasksStateService.value$.subscribe((state) => {
      this.undoneCount = state.undoneCount;
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
