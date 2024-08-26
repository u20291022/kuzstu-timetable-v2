import {  Component, Inject } from '@angular/core';
import { StarSvgComponent } from "../../shared/components/star-svg/star-svg.component";
import { SearchSvgComponent } from "../../shared/components/search-svg/search-svg.component";
import { DOCUMENT, NgFor, NgIf } from '@angular/common';
import { SearchResult } from '../../shared/models/search-result.model';
import { TimetableType } from '../../shared/enums/timetable-type.enum';
import { AlphabetSortPipe } from "../../shared/pipes/alphabet-sort.pipe";
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { SearchType } from '../../shared/enums/search-type.enum';
import { SlicePipe } from "../../shared/pipes/slice.pipe";
import { LoadingComponent } from "../../shared/components/loading/loading.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgFor, NgIf, StarSvgComponent, SearchSvgComponent, SearchPipe, AlphabetSortPipe, SlicePipe, LoadingComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  private searchType: SearchType = SearchType.NONE;
  private showingResults = false;
  private loadingResults = false;
  private timetableName: string = 'ИТб-222';
  private placeholder: string = this.timetableName;
  private textToSearch: string = '';

  private defaultResults: SearchResult[] = [ 
    { name: 'Расписание группы', id: '', type: TimetableType.GROUP },
    { name: 'Расписание преподавателя', id: '', type: TimetableType.TEACHER },
    { name: 'Расписание аудитории', id: '', type: TimetableType.CLASSROOM },
  ];
  private results: SearchResult[] = this.defaultResults;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.document.addEventListener('click', (event) => {
      const searchBox = this.document.getElementsByClassName('search-box')[0];

      if (event.target !== searchBox && !searchBox.contains(event.target as Node)) {
        this.clearInput();
        this.placeholder = this.timetableName;
        this.showingResults = false;
      }
    });
  }

  private clearInput(): void {
    const searchInput = this.document.getElementsByClassName('search-input')[0] as HTMLInputElement;
    this.textToSearch = searchInput.value = '';
  }

  public getSearchType(): SearchType {
    return this.searchType;
  }

  public getPlaceholder(): string {
    return this.placeholder;
  }

  public getTextToSearch(): string {
    return this.textToSearch;
  }

  public getResults(): SearchResult[] {
    return this.results;
  }

  public isShowingResults(): boolean {
    return this.showingResults;
  }

  public isLoadingResults(): boolean {
    return this.loadingResults;
  }

  public isShouldSort(): boolean { 
    return this.getSearchType() !== SearchType.NONE;
  }

  public selectResult(result: SearchResult): void {
    this.placeholder = result.name;
    if (result.id) {
      this.timetableName = result.name;
      this.showingResults = false;
      this.clearInput();
    }
  }

  public onInput(event: Event): void {
    this.textToSearch = (event.target as HTMLInputElement).value;
  }

  public onFocus(): void {
    this.showingResults = true;
  }
}
