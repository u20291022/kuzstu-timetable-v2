import { Component } from '@angular/core';
import { GroupSvgComponent } from "../../../shared/components/group-svg/group-svg.component";
import { SearchSvgComponent } from "../../../shared/components/search-svg/search-svg.component";
import { NgFor, NgIf } from '@angular/common';
import { GroupOrTeacher } from '../../../shared/models/group-or-teacher.model';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { AlphabetSortPipe } from "../../../shared/pipes/alphabet-sort.pipe";

@Component({
  selector: 'app-group-and-teacher',
  standalone: true,
  imports: [SearchPipe, NgFor, NgIf, GroupSvgComponent, SearchSvgComponent, AlphabetSortPipe],
  templateUrl: './group-and-teacher.component.html',
  styleUrl: './group-and-teacher.component.css'
})
export class GroupAndTeacherComponent {
  public showingResults = true; // TODO: move to the service
  public textToSearch: string = '';
  public results: GroupOrTeacher[] = [
    { name: 'ИТб-222', id: '222' },
    { name: 'ИТб-221', id: '221' }
  ];

  public selectResult(resultId: string) {
    console.log('Selected result', resultId);
  }

  public onSearchInput(event: any): void {
    this.textToSearch = event.target.value;
  }
}
