import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-autosize-textarea",
  standalone: true,
  template: `
    <textarea
      #textarea
      [placeholder]="placeholder"
      [value]="value"
      class="rounded-md resize-none overflow-hidden w-full outline-2 outline-orange-400/50"
      (click)="$event.stopPropagation()"
      (keyup.enter)="emit(textarea)"
      (input)="calcHeight(textarea)"
    ></textarea>
  `,
  styles: [],
})
export class AutosizeTextareaComponent {
  @Input() placeholder = "";
  @Input() value = "";
  @Input() clearAfterEmit = false;

  @Output() submitText = new EventEmitter<string>();

  protected emit(textarea: HTMLTextAreaElement) {
    this.submitText.emit(textarea.value.trim());

    if (this.clearAfterEmit) {
      textarea.value = "";
    }
  }

  protected calcHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = textarea.scrollHeight + "px";
  }
}
