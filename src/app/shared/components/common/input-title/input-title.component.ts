import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-input-title', // Component selector
  templateUrl: './input-title.component.html',
  styleUrls: ['./input-title.component.scss'],
  standalone: true, // For standalone component (Angular 14+)
  imports: [CommonModule, MatIconModule], // If standalone, this allows direct import
})
export class InputTitleComponent {
  @Input() title: string = ''; // Title of the input (optional)
  @Input() titleClass: string = ''; // Custom CSS class for the title (optional)
  @Input() icon: string = ''; // Icon for the input (optional)
  @Input() isMandatory: boolean = false; // Whether the field is mandatory (optional)
  @Input() iconColor: string = 'gray'; // Icon color (optional)

  @Output() clickIcon = new EventEmitter<void>(); // Emit event when icon is clicked

  // Handle icon click event
  onIconClick() {
    this.clickIcon.emit(); // Emit event when the icon is clicked
  }
}
