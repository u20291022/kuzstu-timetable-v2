import { Component } from '@angular/core';
import { CalendarComponent } from "./calendar/calendar.component";
import { PopupState } from '../../shared/enums/popup-state.enum';
import { MenuComponent } from "./menu/menu.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [NgIf, CalendarComponent, MenuComponent],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  private popupState: PopupState = PopupState.MENU; // TODO: move to service

  public isCalendarPopup(): boolean {
    return this.popupState === PopupState.CALENDAR;
  }

  public isMenuPopup(): boolean {
    return this.popupState === PopupState.MENU;
  }

  public isColorsPopup(): boolean {
    return this.popupState === PopupState.COLORS;
  }

  public isGroupOrTeacherSelectionPopup(): boolean {
    return this.popupState === PopupState.GROUP_OR_TEACHER_SELECTION;
  }
}
