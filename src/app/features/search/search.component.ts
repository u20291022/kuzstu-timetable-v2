import {  AfterViewInit, Component } from '@angular/core';
import { StarSvgComponent } from "../../shared/components/star-svg/star-svg.component";
import { SearchSvgComponent } from "../../shared/components/search-svg/search-svg.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgIf, StarSvgComponent, SearchSvgComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

}
