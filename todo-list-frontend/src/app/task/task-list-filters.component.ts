import { Component, EventEmitter, Output, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from "@angular/forms";
import { Subscription, debounceTime, startWith } from "rxjs";
import { TaskStatus, TASK_STATUS } from "./models/TaskStatus";
import { SortBy, SORT_BY } from "../shared/SortBy";
import { GetAllTasksSearchParams } from "./services/tasks.service";
import {
  heroArrowRight,
  heroArrowDown,
  heroArrowUp,
  heroArrowUpCircle,
  heroArrowDownCircle,
} from "@ng-icons/heroicons/outline";
import { NgIcon, NgIconComponent, provideIcons } from "@ng-icons/core";

export function getAllTasksSearchParams(
  formValue: TasksListFiltersFormValue
): GetAllTasksSearchParams {
  let searchParams = {
    _sort: "createdAt",
    _order: formValue.sortBy.toLocaleLowerCase(),
    q: formValue.searchTerm,
  } as GetAllTasksSearchParams;

  if (formValue.status === TASK_STATUS.TODO) {
    searchParams.done_like = "false";
  } else if (formValue.status === TASK_STATUS.DONE) {
    searchParams.done_like = "true";
  }

  return searchParams;
}

type FormValue<T extends FormGroup> = ReturnType<T["getRawValue"]>;

type TasksListFiltersForm = FormGroup<{
  searchTerm: FormControl<string>;
  status: FormControl<TaskStatus>;
  sortBy: FormControl<SortBy>;
}>;

export type TasksListFiltersFormValue = FormValue<TasksListFiltersForm>;

@Component({
  standalone: true,
  selector: "app-tasks-list-filters",
  imports: [ReactiveFormsModule, NgIconComponent],
  viewProviders: [
    provideIcons({
      heroArrowRight,
      heroArrowDown,
      heroArrowUp,
      heroArrowUpCircle,
      heroArrowDownCircle,
    }),
  ],
  template: `
    <form [formGroup]="form" class="grid grid-cols2 grid-rows2 cursor-pointer">
      <div class="flex justify-center gap-8">
        <details open class="mx-2">
          <summary class="flex items-center" (click)="toggleDetails()">
            <ng-icon
              [name]="isDetailsOpen ? 'heroArrowDown' : 'heroArrowRight'"
              class="text-sm mx-2"
            ></ng-icon>
            <span>Filters</span>
          </summary>
          <div class="mb-2 flex justify-between">
            <fieldset class="flex flex-col">
              <input
                formControlName="searchTerm"
                id="filter-search-term"
                class="border-b border-b-orange-400 bg-inherit outline-none px-3 py-2 placeholder-gray-500"
                placeholder="Search..."
              />
            </fieldset>

            <fieldset class="flex flex-col">
              <select
                formControlName="status"
                id="filter-status"
                class="border border-orange-400 outline-none rounded-md px-1 py-2"
              >
                <option [value]="statusOptions.ALL">All</option>
                <option [value]="statusOptions.DONE">Done</option>
                <option [value]="statusOptions.TODO">Todo</option>
              </select>
            </fieldset>
          </div>
        </details>
      </div>
      <div class="flex justify-center gap-8">
        <button
          class="rounded px-4 py-2 transition-colors duration-300 flex items-center"
          [class.bg-green-400]="form.controls.sortBy.value === sortOptions.DESC"
          (click)="sort(sortOptions.DESC)"
        >
          <ng-icon name="heroArrowUpCircle" class="text-xl mr-3" />
          Newest
        </button>
        <button
          class="rounded px-4 py-2 transition-colors duration-300 flex items-center"
          [class.bg-green-400]="form.controls.sortBy.value === sortOptions.ASC"
          (click)="sort(sortOptions.ASC)"
        >
          <ng-icon name="heroArrowDownCircle" class="text-xl mr-3" />
          Oldest
        </button>
      </div>
    </form>
  `,
  styles: [
    `
      details {
        border: 1px solid #aaa;
        border-radius: 4px;
        padding: 0.5em 0.5em 0;
        width: 300px;
        margin: 1em 0;
      }

      summary {
        font-weight: bold;
        margin: -0.5em -0.5em 0;
        padding: 0.5em;
      }
      summary:before {
        display: inline-block;
        font-size: 0.8em;
        padding: 0 0.5em;
        transition: transform 0.2s ease-in-out;
      }

      details[open] > summary:before {
        max-height: 300px;
      }
    `,
  ],
})
export class TasksListFiltersComponent {
  private formBuilder = inject(NonNullableFormBuilder);

  @Output() filtersChange = new EventEmitter<TasksListFiltersFormValue>();

  form: TasksListFiltersForm = this.formBuilder.group({
    searchTerm: this.formBuilder.control<string>(""),
    sortBy: this.formBuilder.control<SortBy>(SORT_BY.DESC),
    status: this.formBuilder.control<TaskStatus>(TASK_STATUS.ALL),
  });

  protected sortOptions = SORT_BY;
  protected statusOptions = TASK_STATUS;

  private formChangesSubscription?: Subscription;

  isDetailsOpen = true; // Początkowo otwarty

  toggleDetails(): void {
    this.isDetailsOpen = !this.isDetailsOpen;
  }

  sort(sort: SortBy) {
    this.form.patchValue({
      sortBy: sort,
    });
  }

  ngOnInit() {
    this.formChangesSubscription = this.form.valueChanges
      .pipe(startWith(this.form.value), debounceTime(200))
      .subscribe((v) => {
        this.filtersChange.emit(this.form.getRawValue());
      });
  }

  ngOnDestroy() {
    this.formChangesSubscription?.unsubscribe();
  }
}
