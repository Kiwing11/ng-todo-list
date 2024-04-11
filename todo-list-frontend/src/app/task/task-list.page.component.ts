import { Component, OnInit, inject } from "@angular/core";
import { Task } from "./models/Task";
import {
  GetAllTasksSearchParams,
  TasksService,
} from "./services/tasks.service";
import { SubmitTextComponent } from "../shared/ui/submit-text.component";
import {
  ComponentListState,
  LIST_STATE_VALUE,
} from "src/app/task/utils/list-state.type";
import { TaskCardComponent } from "./task-card.component";
import { TaskListComponent } from "./task-list.component";
import { TasksStateService } from "./services/tasks.state.service";
import { Subscription } from "rxjs";
import {
  TasksListFiltersComponent,
  TasksListFiltersFormValue,
  getAllTasksSearchParams,
} from "./task-list-filters.component";

@Component({
  selector: "app-task-list-page",
  standalone: true,
  imports: [
    SubmitTextComponent,
    TaskCardComponent,
    TaskListComponent,
    TasksListFiltersComponent,
  ],
  template: `
    <div class="text-center">
      <div>
        <app-submit-text
          class="mt-2"
          (submitText)="
            listState.state === listStateValue.SUCCESS &&
              addTask($event, listState.results)
          "
        >
        </app-submit-text>
        <app-tasks-list-filters (filtersChange)="handleFiltersChange($event)" />
      </div>
      @if(listState.state === listStateValue.SUCCESS){
      <app-task-list
        class="block mt-4 w-full mx-auto"
        [tasks]="listState.results"
      />
      } @else if(listState.state === listStateValue.ERROR) {
      <p>{{ listState.error.message }}</p>
      } @else if(listState.state === listStateValue.LOADING){
      <p>Loading...</p>
      }
    </div>
  `,
  styles: ``,
})
export class TaskListPageComponent implements OnInit {
  private tasksService = inject(TasksService);
  private tasksStateService = inject(TasksStateService);
  private subscription?: Subscription;

  listState: ComponentListState<Task> = { state: LIST_STATE_VALUE.IDLE };
  listStateValue = LIST_STATE_VALUE;

  ngOnInit(): void {
    this.subscription = this.tasksStateService.value$.subscribe({
      next: (state) => {
        this.listState = {
          state: LIST_STATE_VALUE.SUCCESS,
          results: state.tasks,
        };
      },
      error: (err) => {
        this.listState = {
          state: LIST_STATE_VALUE.ERROR,
          error: err,
        };
      },
    });
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  handleFiltersChange(filters: TasksListFiltersFormValue): void {
    this.getTasks(getAllTasksSearchParams({ ...filters }));
  }

  getTasks(searchParams?: GetAllTasksSearchParams) {
    this.listState = { state: LIST_STATE_VALUE.LOADING };

    this.tasksService.getAll(searchParams).subscribe({
      next: (response) => {
        this.listState = {
          state: LIST_STATE_VALUE.SUCCESS,
          results: response.body!,
        };
      },
      error: (err) => {
        this.listState = {
          state: LIST_STATE_VALUE.ERROR,
          error: err,
        };
      },
    });
  }

  addTask(name: string, tasks: Task[]): void {
    this.tasksService.add(name).subscribe({
      next: (task) => {
        setTimeout(() => {
          this.listState = {
            state: LIST_STATE_VALUE.SUCCESS,
            results: tasks.concat(task),
          };
        }, 200);
      },
      error: (err) => {
        alert(err.message);
      },
    });
  }
}
