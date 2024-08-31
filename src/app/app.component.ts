import { Component } from '@angular/core';
import { HeaderComponent } from './features/header/header.component';
import { SearchComponent } from "./features/search/search.component";
import { WeekdaysComponent } from "./features/weekdays/weekdays.component";
import { PopupComponent } from './features/popup/popup.component';
import { ThemeService } from './core/services/theme.service';
import { LessonsComponent } from "./features/lessons/lessons.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SearchComponent, PopupComponent, WeekdaysComponent, LessonsComponent],
  template: `
    <app-header></app-header>
    <app-search></app-search>
    <app-popup></app-popup>
    <app-weekdays></app-weekdays>
    <app-lessons></app-lessons>
  `,
  styles: ``
})
export class AppComponent {
  constructor(private themeService: ThemeService) {}
}
