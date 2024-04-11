import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NavComponent } from "../nav/nav.component";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: "app-master",
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NavComponent,
    HeaderComponent,
    FooterComponent,
  ],
  template: `
    <body class="min-h-screen w-full flex flex-col items-center">
      <app-header />
      <app-nav class="w-1/2" />
      <div class="flex flex-1 justify-center w-full">
        <div class="w-1/2">
          <router-outlet></router-outlet>
        </div>
      </div>
      <app-footer class="w-1/2 mt-20" />
    </body>
  `,
})
export class MasterComponent {}
