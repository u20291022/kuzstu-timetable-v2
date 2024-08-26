import {  Component, Inject } from '@angular/core';
import { StarSvgComponent } from "../../shared/components/star-svg/star-svg.component";
import { SearchSvgComponent } from "../../shared/components/search-svg/search-svg.component";
import { AsyncPipe, DOCUMENT, NgFor, NgIf } from '@angular/common';
import { Timetable } from '../../shared/models/timetable.model';
import { TimetableType } from '../../shared/enums/timetable-type.enum';
import { AlphabetSortPipe } from "../../shared/pipes/alphabet-sort.pipe";
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { SearchType } from '../../shared/enums/search-type.enum';
import { SlicePipe } from "../../shared/pipes/slice.pipe";
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { TimetableService } from '../../core/services/timetable.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgFor, NgIf, StarSvgComponent, SearchSvgComponent, AsyncPipe,  SearchPipe, AlphabetSortPipe, SlicePipe, LoadingComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  private searchType: SearchType = SearchType.NONE;
  private showingResults = false;
  private placeholder: string;
  private textToSearch: string = '';
  private results: Timetable[];

  constructor(@Inject(DOCUMENT) private document: Document, private timetableService: TimetableService) {
    this.results = this.timetableService.getDefaultSearchResults();
    this.placeholder = this.getTimetableName();
    this.document.addEventListener('click', (event) => {
      const searchBox = this.document.getElementsByClassName('search-box')[0];

      if (event.target !== searchBox && !searchBox.contains(event.target as Node)) {
        this.clearInput();
        this.placeholder = this.getTimetableName();
        this.searchType = SearchType.NONE;
        this.showingResults = false;
        this.results = this.timetableService.getDefaultSearchResults();
      }
    });
  }

  private clearInput(): void {
    const searchInput = this.document.getElementsByClassName('search-input')[0] as HTMLInputElement;
    this.textToSearch = searchInput.value = '';
  }

  public getTimetableName(): string {
    return this.timetableService.getCurrentTimetableName();
  }

  public getPlaceholder(): string {
    return this.placeholder;
  }

  public getTextToSearch(): string {
    return this.textToSearch;
  }

  public getResults(): Timetable[] {
    return this.results;
  }

  public isShowingResults(): boolean {
    return this.showingResults;
  }

  public isLoadingResults(): boolean {
    return this.timetableService.isLoadingSearchResults();
  }

  public isShouldSort(): boolean { 
    return this.searchType !== SearchType.NONE;
  }

  public selectResult(result: Timetable): void {
    this.placeholder = result.name;
    this.searchType = result.type.toString() as SearchType;
    if (result.id !== '') {
      this.timetableService.fetchLessons();
      this.timetableService.setTimetableTo(result);
      this.searchType = SearchType.NONE;
      this.showingResults = false;
      this.results = this.timetableService.getDefaultSearchResults();
      this.clearInput();
    }
    else {
      this.timetableService.getTimetables(this.searchType).then((timetables) => {
        this.results = timetables;
      });
    }
  }

  public onInput(event: Event): void {
    this.textToSearch = (event.target as HTMLInputElement).value;
  }

  public onFocus(): void {
    this.showingResults = true;
  }
}
