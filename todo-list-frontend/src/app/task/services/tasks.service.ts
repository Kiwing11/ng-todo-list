import { Injectable, inject } from "@angular/core";
import { Task } from "../models/Task";
import { HttpClient } from "@angular/common/http";
import { TasksStateService } from "./tasks.state.service";
import { tap } from "rxjs";
import { apiEndpoint } from "src/app/auth/constants/constants";

export type TaskUpdatePayload = { done?: boolean; name?: string };

export type GetAllTasksSearchParams = {
  q: string;
  _sort: "createdAt";
  _order: "desc" | "asc";
  done_like: "true" | "false" | "";
};

@Injectable({
  providedIn: "root",
})
export class TasksService {
  private http = inject(HttpClient);
  private state = inject(TasksStateService);

  getAll(searchParams?: GetAllTasksSearchParams) {
    return this.http
      .get<Task[]>(`${apiEndpoint.TodoEndpoint.getAll}`, {
        observe: "response",
        params: searchParams,
      })
      .pipe(
        tap((response) => {
          if (response.body) {
            this.state.setTaskList(response.body);
          }
        })
      );
  }

  delete(taskId: string) {
    return this.http
      .delete(`${apiEndpoint.TodoEndpoint.delete}/${taskId}`)
      .pipe(
        tap(() => {
          this.state.removeTask(taskId);
        })
      );
  }

  update(taskId: string, payload: TaskUpdatePayload) {
    return this.http
      .patch<Task>(`${apiEndpoint.TodoEndpoint.update}/${taskId}`, payload)
      .pipe(
        tap((response) => {
          this.state.updateTask(response);
        })
      );
  }

  add(name: string) {
    return this.http
      .post<Task>(`${apiEndpoint.TodoEndpoint.create}`, { name })
      .pipe(
        tap((task) => {
          this.state.addTask(task);
        })
      );
  }
}
