import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Task } from "./models/Task";
import { RemoveItemButtonComponent } from "../shared/ui/remove-item-button.component";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import {
  heroCalendarDays,
  heroPencilSquare,
} from "@ng-icons/heroicons/outline";
import { AutosizeTextareaComponent } from "../shared/ui/autosize-textarea.component";
import { TaskUpdatePayload } from "./services/tasks.service";
import { DatePipe, NgIf } from "@angular/common";
import { EditItemNameButtonComponent } from "../shared/ui/edit-item-name-button.component";

@Component({
  selector: "app-task-card",
  standalone: true,
  imports: [
    RemoveItemButtonComponent,
    EditItemNameButtonComponent,
    AutosizeTextareaComponent,
    NgIconComponent,
    DatePipe,
    NgIf,
  ],
  viewProviders: [provideIcons({ heroCalendarDays, heroPencilSquare })],
  template: `
    <div
      class="rounded-md shadow-md p-4 block transition-colors ease-in-out duration-150"
      [class.bg-green-300]="task.done"
      [class.bg-slate-100]="!task.done"
    >
      <button class="w-full" (click)="!editMode && handleSingleClick()">
        <header class="flex justify-between">
          <app-edit-item-name-button (confirm)="toggleEditMode()" />
          <app-remove-item-button (confirm)="delete.emit()" />
        </header>
        <section class="text-left">
          @if (editMode) {
          <app-autosize-textarea
            (keyup.escape)="editMode = false"
            (submitText)="updateTaskName($event)"
            [value]="task.name"
          />
          } @else {
          <span
            class="transtion ease-in-out duration-150 text-lg"
            [class.line-through]="task.done"
          >
            {{ task.name }}
          </span>
          }
        </section>
        <footer class=" pt-2">
          <div class="flex items-center justify-end">
            <span class="text-xs pr-1"
              >{{ task.createdAt | date : "dd/MM/yyyy" }}
            </span>
            <ng-icon name="heroCalendarDays" class="text-lg" />
          </div>
        </footer>
      </button>
    </div>
  `,
  styles: ``,
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  @Output() update = new EventEmitter<TaskUpdatePayload>();
  @Output() delete = new EventEmitter<void>();

  editMode = false;

  isSingleClick = true;

  updateTaskName(updatedName: string) {
    this.update.emit({ name: updatedName });

    this.editMode = false;
  }

  handleSingleClick() {
    this.isSingleClick = true;

    setTimeout(() => {
      if (this.isSingleClick) {
        this.update.emit({ done: !this.task.done });
      }
    }, 50);
  }
  toggleEditMode() {
    this.isSingleClick = false;
    this.editMode = !this.editMode;
  }
}
