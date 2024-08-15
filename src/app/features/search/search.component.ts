import { Component, OnInit } from '@angular/core';
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
export class SearchComponent implements OnInit {
  ngOnInit(): void {
    const searchRelativeBox = document.getElementsByClassName('search-relative-box')[0] as HTMLDivElement;
    const searchBox = document.getElementsByClassName('search-box')[0] as HTMLDivElement;
    searchRelativeBox.style.width = `${searchBox.offsetWidth}px`;
    searchRelativeBox.style.height = `${searchBox.offsetHeight}px`;
  }
}
