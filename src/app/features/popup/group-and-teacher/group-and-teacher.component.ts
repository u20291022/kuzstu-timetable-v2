import { Component } from '@angular/core';
import { GroupSvgComponent } from "../../../shared/components/group-svg/group-svg.component";
import { SearchSvgComponent } from "../../../shared/components/search-svg/search-svg.component";
import { NgFor, NgIf } from '@angular/common';
import { GroupOrTeacher } from '../../../shared/models/group-or-teacher.model';

@Component({
  selector: 'app-group-and-teacher',
  standalone: true,
  imports: [NgFor, NgIf, GroupSvgComponent, SearchSvgComponent],
  templateUrl: './group-and-teacher.component.html',
  styleUrl: './group-and-teacher.component.css'
})
export class GroupAndTeacherComponent {
  public showingResults = true; // TODO: move to the service
  public results: GroupOrTeacher[] = [
    { name: 'ИТб-222', id: '123' }
  ];

  public selectResult(resultId: string) {
    console.log('Selected result', resultId);
  }
}
