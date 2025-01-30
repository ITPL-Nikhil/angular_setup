import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputTitleComponent } from '../input-title/input-title.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  imports: [CommonModule, InputTitleComponent, FormsModule, MatIconModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() inputValue: string = ''; // Define the inputValue property for ngModel binding
  @Input() title: string = ''; // Title of the input (optional)
  @Input() titleClass: string = ''; // Bind class property for styling (optional)
  @Input() titleIcon: string = ''; // Icon for the input (optional)
  @Input() icon: string = ''; // Icon for the input (optional)
  @Input() titleIconColor: string = 'gray'; // Icon color (optional)
  @Input() iconColor: string = 'gray'; // Icon color (optional)
  @Input() isMandatory: boolean = false; // Whether the field is mandatory (optional)
  @Input() inputType: string = 'text'; // Input type (optional, default is 'text')
  @Input() inputClass: string = ''; // Bind class property for styling (optional)

  @Output() clickTitleIcon = new EventEmitter<void>(); // Emit event when icon is clicked
  @Output() clickIcon = new EventEmitter<void>(); // Emit event when icon is clicked
  @Output() inputChange = new EventEmitter<string>(); // Emit event when input value changes

  @Input() disabled: boolean = false; // Disabled input property

  // Value accessor properties and methods
  onChange: (value: string) => void = () => {}; // Function to call when value changes
  onTouched: () => void = () => {}; // Function to call when input is touched

  // Method to handle icon click event
  titleIconOnClick(): void {
    this.clickTitleIcon.emit();
  }

  // Method to handle icon click event
  iconOnClick(): void {
    this.clickIcon.emit();
  }

  // Method to handle input change event
  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.inputChange.emit(inputElement.value);
    this.onChange(inputElement.value); // Notify the form control about value change
  }

  // Write value to input element (for ngModel)
  writeValue(value: string | null): void {
    if (value !== null && value !== undefined) {
      this.inputValue = value;
    }
  }

  // Register onChange function (called by the form control)
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  // Register onTouched function (called when input is touched)
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Set the disabled state of the input
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled; // Set the disabled property based on the form control's disabled state
  }
}
