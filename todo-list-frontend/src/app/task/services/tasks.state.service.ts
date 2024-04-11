import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Task } from "../models/Task";

const initialState = {
  tasks: [] as Task[],
  undoneCount: 0,
};

@Injectable({ providedIn: "root" })
export class TasksStateService {
  private state$ = new BehaviorSubject(initialState);
  value$ = this.state$.asObservable();

  setTaskList(tasks: Task[]) {
    this.state$.next({
      tasks,
      undoneCount: tasks.filter((task) => !task.done).length,
    });
  }

  addTask(task: Task) {
    this.state$.next({
      tasks: [...this.state$.value.tasks, task],
      undoneCount: task.done
        ? --this.state$.value.undoneCount
        : ++this.state$.value.undoneCount,
    });
  }

  updateTask(updatedTask: Task) {
    const updatedTasks = this.state$.value.tasks.map((task) => {
      return task._id === updatedTask._id ? updatedTask : task;
    });
    this.state$.next({
      tasks: updatedTasks,
      undoneCount: updatedTasks.filter((task) => !task.done).length,
    });
  }

  removeTask(taskId: Task["_id"]) {
    const updatedTasks = this.state$.value.tasks.filter((task) => {
      return task._id !== taskId;
    });

    this.state$.next({
      tasks: updatedTasks,
      undoneCount: updatedTasks.filter((task) => !task.done).length,
    });
  }
}
