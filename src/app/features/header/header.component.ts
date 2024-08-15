import { Component } from '@angular/core';
import { CalendarSvgComponent } from "../../shared/components/calendar-svg/calendar-svg.component";
import { MenuSvgComponent } from "../../shared/components/menu-svg/menu-svg.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CalendarSvgComponent, MenuSvgComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public dateString = '2 сентября, нечётная неделя';
}
