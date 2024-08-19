import { Component } from '@angular/core';
import { CalendarComponent } from "./calendar/calendar.component";
import { PopupState } from '../../shared/enums/popup-state.enum';
import { MenuComponent } from "./menu/menu.component";
import { NgIf } from '@angular/common';
import { ColorsComponent } from "./colors/colors.component";
import { PopupService } from '../../core/services/popup.service';
import { GroupAndTeacherComponent } from "./group-and-teacher/group-and-teacher.component";

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [NgIf, CalendarComponent, MenuComponent, ColorsComponent, GroupAndTeacherComponent],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  constructor(private popupService: PopupService) {}

  public isShowingPopup(): boolean {
    return this.popupService.isShowingPopup();
  }

  public isCalendarPopup(): boolean {
    return this.popupService.isCalendarPopup();
  }

  public isMenuPopup(): boolean {
    return this.popupService.isMenuPopup();
  }

  public isColorsPopup(): boolean {
    return this.popupService.isColorsPopup();
  }

  public isGroupAndTeacherPopup(): boolean {
    return this.popupService.isGroupOrTeacherSelectionPopup();
  }
}
