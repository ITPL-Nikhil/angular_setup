import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringTransform', // Updated pipe name
})
export class StringTransformPipe implements PipeTransform {
  transform(value: string, operation: string = 'uppercase'): string {
    if (!value) {
      return '';
    }

    switch (operation) {
      case 'uppercase':
        return value.toUpperCase();
      case 'lowercase':
        return value.toLowerCase();
      case 'reverse':
        return value.split('').reverse().join('');
      case 'capitalize':
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      default:
        return value; // If no operation is passed, return the original string
    }
  }
}
