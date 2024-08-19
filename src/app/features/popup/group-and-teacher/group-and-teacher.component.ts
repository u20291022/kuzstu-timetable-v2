import { Component } from '@angular/core';
import { GroupSvgComponent } from "../../../shared/components/group-svg/group-svg.component";
import { SearchSvgComponent } from "../../../shared/components/search-svg/search-svg.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-group-and-teacher',
  standalone: true,
  imports: [NgIf, GroupSvgComponent, SearchSvgComponent],
  templateUrl: './group-and-teacher.component.html',
  styleUrl: './group-and-teacher.component.css'
})
export class GroupAndTeacherComponent {
  public showingResults = true; // TODO: move to the service
}
