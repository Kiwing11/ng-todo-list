import { Component, EventEmitter, Output } from "@angular/core";
import { NgIf } from "@angular/common";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { heroPencilSquare } from "@ng-icons/heroicons/outline";

@Component({
  selector: "app-edit-item-name-button",
  standalone: true,
  imports: [NgIf, NgIconComponent],
  viewProviders: [provideIcons({ heroPencilSquare })],
  template: `
    <div>
      <button
        (click)="confirm.emit(); $event.stopPropagation()"
        class="flex hover:bg-white hover:rounded-full"
      >
        <ng-icon name="heroPencilSquare" class="icon--hover text-lg" />
      </button>
    </div>
  `,
  styles: [
    `
      .icon--hover {
        @apply hover:text-red-700 hover:rounded-full;
      }
    `,
  ],
})
export class EditItemNameButtonComponent {
  @Output() confirm = new EventEmitter<void>();
}
