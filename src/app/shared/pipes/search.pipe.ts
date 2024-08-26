import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {
  transform(items: any[] | null, textToSearch: string): any[] {
    if (!items) return [];
    if (!textToSearch) return items;
    textToSearch = this.transformToRussian(textToSearch.toLowerCase());
    return items.filter(item => {
      return JSON.stringify(item).toLowerCase().includes(textToSearch);
    });
  }

  private transformToRussian(text: string): string {
    const englishLetters = 'qwertyuiop[]asdfghjkl;\'zxcvbnm,./';
    const russianLetters = 'йцукенгшщзхъфывапролджэячсмитьбю.';
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const index = englishLetters.indexOf(text[i]);
      if (index !== -1) {
        result += russianLetters[index];
      } else {
        result += text[i];
      }
    }
    return result;
  }
}
