import {
  Component,
  computed,
  ElementRef,
  forwardRef,
  Input,
  input,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-otp-input',
  standalone: false,
  templateUrl: './otp-input.html',
  styleUrl: './otp-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OtpInput),
      multi: true,
    },
  ],
})
export class OtpInput implements ControlValueAccessor {
  @ViewChildren('otpInput') inputs!: QueryList<ElementRef>;
  size = input<number>(6);

  slots = computed(() => Array(this.size()).fill(0));

  value: string = '';
  disabled = false;

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value ?? '';

    setTimeout(() => {
      if (this.inputs) {
        const charArray = this.value.split('');
        this.inputs.forEach((inputRef, index) => {
          inputRef.nativeElement.value = charArray[index] ?? '';
        });
      }
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  moveFocus(event: KeyboardEvent, index: number) {
    const target = event.target as HTMLInputElement;
    const val = target.value;

    this.onChange(this.getOtpValue());

    if (val && index < this.inputs.length - 1) {
      this.inputs.toArray()[index + 1].nativeElement.focus();
    }
  }

  handleBackspace(event: KeyboardEvent, index: number) {
    const currentInput = this.inputs.toArray()[index].nativeElement;

    if (event.key === 'Backspace' && !currentInput.value && index > 0) {
      this.inputs.toArray()[index - 1].nativeElement.focus();
      this.inputs.toArray()[index - 1].nativeElement.value = '';
      this.onChange(this.getOtpValue());
    }
  }

  getOtpValue(): string {
    return this.inputs ? this.inputs.map((input) => input.nativeElement.value).join('') : '';
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();

    const clipboardData = event.clipboardData;
    const pastedText = clipboardData?.getData('text') ?? '';

    const characters = pastedText.split('').slice(0, this.inputs.length);

    const inputElements = this.inputs.toArray();
    characters.forEach((char, index) => {
      if (inputElements[index]) {
        inputElements[index].nativeElement.value = char;
      }
    });

    const nextIndex =
      characters.length < this.inputs.length ? characters.length : this.inputs.length - 1;
    inputElements[nextIndex].nativeElement.focus();

    this.onChange(this.getOtpValue());
  }
}
