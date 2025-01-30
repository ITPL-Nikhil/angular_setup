import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
  imports: [MatIconModule, CommonModule, MatButtonModule],
})
export class CustomButtonComponent {
  @Input() buttonText: string = ''; // Text for the button
  @Input() icon: string = ''; // Icon for the button (optional)
  @Input() iconPosition: 'left' | 'right' = 'left'; // Icon position ('left' or 'right')
  @Input() iconColor: string = 'black'; // Icon color (optional)
  @Input() buttonColorClass: string = 'bg-blue-500 hover:bg-blue-600'; // Button color class (default is blue)
  @Input() textColor: string = 'white'; // Text color (optional)
  @Input() disabled: boolean = false; // Disabled state of the button (optional)
  @Input() buttonClass: string = ''; // Additional classes for the button (optional)

  @Output() buttonClick = new EventEmitter<void>(); // Event when button is clicked

  onClick(): void {
    if (!this.disabled) {
      this.buttonClick.emit();
    }
  }
}
