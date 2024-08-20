import { Component } from '@angular/core';
import { CalendarSvgComponent } from "../../shared/components/calendar-svg/calendar-svg.component";
import { MenuSvgComponent } from "../../shared/components/menu-svg/menu-svg.component";
import { PopupService } from '../../core/services/popup.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CalendarSvgComponent, MenuSvgComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public dateString = '2 сентября, нечётная неделя'; // TODO: move to service

  constructor(private popupService: PopupService) {}

  public isShowingCalendar(): boolean {
    return this.popupService.isShowingPopup() && this.popupService.isCalendarPopup();
  }

  public isShowingMenu(): boolean {
    return this.popupService.isShowingPopup() && (
      this.popupService.isMenuPopup()
      || this.popupService.isColorsPopup()
      || this.popupService.isGroupOrTeacherSelectionPopup()
    );
  }

  public showCalendar(): void {
    this.popupService.toggleCalendarPopup();
  }

  public showMenu(): void {
    this.popupService.toggleMenuPopup();
  }
}
