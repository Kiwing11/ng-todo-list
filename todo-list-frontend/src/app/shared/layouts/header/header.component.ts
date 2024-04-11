import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  template: `
    <h1
      class="text-center mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
    >
      <a routerLink=""> Todo list </a>
    </h1>
  `,
  styles: ``,
})
export class HeaderComponent {}
