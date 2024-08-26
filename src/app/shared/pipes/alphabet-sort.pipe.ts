import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alphabetSort',
  standalone: true
})
export class AlphabetSortPipe implements PipeTransform {
  transform(items: any[], sort = true): any[] {
    return !sort ? items : items.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }
}
