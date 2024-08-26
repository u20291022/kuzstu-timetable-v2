import { Component } from '@angular/core';
import { GroupSvgComponent } from "../../../shared/components/group-svg/group-svg.component";
import { SearchSvgComponent } from "../../../shared/components/search-svg/search-svg.component";
import { NgFor, NgIf } from '@angular/common';
import { GroupOrTeacher } from '../../../shared/models/group-or-teacher.model';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { AlphabetSortPipe } from "../../../shared/pipes/alphabet-sort.pipe";
import { TimetableType } from '../../../shared/enums/timetable-type.enum';
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { PopupService } from '../../../core/services/popup.service';
import { TimetableService } from '../../../core/services/timetable.service';
import { SearchType } from '../../../shared/enums/search-type.enum';

@Component({
  selector: 'app-group-and-teacher',
  standalone: true,
  imports: [SearchPipe, NgFor, NgIf, GroupSvgComponent, SearchSvgComponent, AlphabetSortPipe, LoadingComponent],
  templateUrl: './group-and-teacher.component.html',
  styleUrl: './group-and-teacher.component.css'
})
export class GroupAndTeacherComponent {
  private loadingResults = false;
  private textToSearch: string = '';
  private results: GroupOrTeacher[] = [];

  constructor(private popupService: PopupService, private timetableService: TimetableService) {
    this.timetableService.getMultipleTimetable([SearchType.GROUP, SearchType.TEACHER]).then(timetables => {
      this.results = timetables.map(timetable => timetable as GroupOrTeacher);
    });
  }

  public isLoadingResults(): boolean {
    return this.loadingResults;
  }

  public getTextToSearch(): string {
    return this.textToSearch;
  }

  public getResults(): GroupOrTeacher[] {
    return this.results;
  }

  public selectResult(result: GroupOrTeacher): void {
    localStorage.setItem('defaultGroupOrTeacher', JSON.stringify(result));
    this.popupService.hidePopup();
  }

  public onSearchInput(event: any): void {
    this.textToSearch = event.target.value;
  }
}
