import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { HeaderComponent } from "../shared/layouts/header/header.component";
import { NavComponent } from "../shared/layouts/nav/nav.component";
import { FooterComponent } from "../shared/layouts/footer/footer.component";

@Component({
  selector: "app-landing-page",
  standalone: true,
  imports: [RouterLink, HeaderComponent, NavComponent],
  template: `
    <app-nav />
    <main class="container mx-auto py-12">
      <section class="hero">
        <h2 class="text-4xl font-bold text-center">
          Organize your tasks with ease
        </h2>
        <p class="text-center text-lg mt-4">
          The Todo List App is a simple and intuitive tool that will help you
          keep track of your daily tasks.
        </p>
      </section>
      <section class="features mt-12">
        <h3 class="text-2xl font-bold text-center">Features:</h3>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <li class="bg-white p-4 rounded-md shadow-sm">
            <h4 class="text-lg font-bold">Add and edit tasks</h4>
            <p class="mt-2">Easily add, edit, and delete tasks as needed.</p>
          </li>
          <li class="bg-white p-4 rounded-md shadow-sm">
            <h4 class="text-lg font-bold">Powerful task management tools</h4>
            <p class="mt-2">
              Filter, search, and sort your tasks with ease to find what you
              need quickly.
            </p>
          </li>
          <li class="bg-white p-4 rounded-md shadow-sm">
            <h4 class="text-lg font-bold">Mark tasks as completed</h4>
            <p class="mt-2">
              Track your progress by marking tasks as completed.
            </p>
          </li>
          <li class="bg-white p-4 rounded-md shadow-sm">
            <h4 class="text-lg font-bold italic text-green-400">Incoming</h4>
            <h4 class="text-lg font-bold">Set priorities for tasks</h4>
            <p class="mt-2">
              Prioritize your tasks so you can focus on the most important ones.
            </p>
          </li>
        </ul>
      </section>
      <section class="testimonials mt-12">
        <h2 class="text-2xl font-bold text-center">
          What our users are saying
        </h2>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <li class="bg-white p-4 rounded-md shadow-sm">
            <blockquote>
              "The Todo List App is so easy to use and helps me stay organized
              on a daily basis."
            </blockquote>
            <p class="text-right mt-2">- Wayne Gretzky</p>
          </li>
          <li class="bg-white p-4 rounded-md shadow-sm">
            <blockquote>
              "Thanks to the Todo List App, I never forget about any tasks
              anymore."
            </blockquote>
            <p class="text-right mt-2">- Juan Pablo</p>
          </li>
        </ul>
      </section>
    </main>
  `,
  styles: ``,
})
export class LandingPageComponent {}
