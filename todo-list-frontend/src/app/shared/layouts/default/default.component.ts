import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: "app-default",
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent],
  template: `
    <body class="min-h-screen w-full flex flex-col items-center">
      <app-header />
      <div class="flex flex-1 justify-center w-full">
        <div class="w-1/2">
          <router-outlet></router-outlet>
        </div>
      </div>
      <app-footer class="w-1/2 mt-20" />
    </body>
  `,
  styles: ``,
})
export class DefaultComponent {}
