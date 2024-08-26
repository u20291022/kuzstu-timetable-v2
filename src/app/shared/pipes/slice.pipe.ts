import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slice',
  standalone: true
})
export class SlicePipe implements PipeTransform {
  transform(value: string, startIndex: number, endIndex: number): string {
    return value.slice(startIndex, endIndex) + (value.length > endIndex ? '...' : '');
  }
}
