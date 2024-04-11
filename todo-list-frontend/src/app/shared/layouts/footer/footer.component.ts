import { Component } from "@angular/core";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [],
  template: `
    <div>
      <footer class="bg-gray-900 text-white text-center py-4">
        &copy; 2024 Krystian Przybysz
        <a class="font-bold hover:underline" href="https://github.com/Kiwing11"
          >github</a
        >
      </footer>
    </div>
  `,
  styles: ``,
})
export class FooterComponent {}
