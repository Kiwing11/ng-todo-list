import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-submit-text",
  standalone: true,
  template: `
    <div>
      <input
        #textInput
        required
        (keyup.enter)="submitText.emit(textInput.value); textInput.value = ''"
        class="border-b border-b-orange-400 outline-none bg-inherit"
      />
      <button
        (click)="onSubmit(textInput)"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 mx-2 rounded"
      >
        Add
      </button>
    </div>
  `,
})
export class SubmitTextComponent {
  @Output() submitText = new EventEmitter<string>();

  onSubmit(textInput: HTMLInputElement): void {
    const text = textInput.value.trim();
    if (text) {
      this.submitText.emit(text);
      textInput.value = "";
    }
  }
}
