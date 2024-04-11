import { Component, Input, OnInit, inject } from "@angular/core";
import { Task } from "./models/Task";
import { TaskUpdatePayload, TasksService } from "./services/tasks.service";
import { SubmitTextComponent } from "../shared/ui/submit-text.component";
import { TaskCardComponent } from "./task-card.component";
import { RemoveItemButtonComponent } from "../shared/ui/remove-item-button.component";

@Component({
  selector: "app-task-list",
  standalone: true,
  imports: [SubmitTextComponent, TaskCardComponent, RemoveItemButtonComponent],
  template: `
    <ul>
      @for (task of tasks; track task._id) {
      <li class="mb-2">
        <app-task-card
          [task]="task"
          (update)="updateTask(task._id, $event)"
          (delete)="delete(task._id)"
        />
      </li>
      } @empty {
      <p>No tasks to do 😀</p>
      }
    </ul>
  `,
  styles: ``,
})
export class TaskListComponent {
  @Input({ required: true }) tasks: Task[] = [];

  private tasksService = inject(TasksService);

  delete(taskId: string) {
    this.tasksService.delete(taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((task) => task._id !== taskId);
      },
      error: (res) => {
        alert(res.message);
      },
    });
  }

  updateTask(taskId: string, updatedTask: TaskUpdatePayload) {
    this.tasksService.update(taskId, updatedTask).subscribe({
      next: (res) => {
        this.tasks = this.tasks.map((task) => {
          if (task._id === res._id) {
            return res;
          } else {
            return task;
          }
        });
      },
      error: (res) => {
        alert(res.message);
      },
    });
  }
}
