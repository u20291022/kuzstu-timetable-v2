import { Inject, Injectable } from '@angular/core';
import { PopupState } from '../../shared/enums/popup-state.enum';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private showingPopop: boolean = true;
  private popupState: PopupState = PopupState.GROUP_OR_TEACHER_SELECTION;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.document.addEventListener('click', (event) => {
      const targetElement = event.target as HTMLElement;
      const popupElement = this.document.getElementsByClassName('popup')[0];
      const headerButtons = this.document.getElementsByClassName('header-button');

      if (popupElement
        && !popupElement.contains(targetElement)
        && !headerButtons[0].contains(targetElement)
        && !headerButtons[1].contains(targetElement)) {
        this.hidePopup();
      }
    });
  }

  public isShowingPopup(): boolean {
    return this.showingPopop;
  }

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

  public toggleCalendarPopup(): void {
    this.togglePopup(PopupState.CALENDAR);
  }

  public toggleMenuPopup(): void {
    this.togglePopup(PopupState.MENU);
  }

  public toggleColorsPopup(): void {
    this.togglePopup(PopupState.COLORS);
  }

  public toggleGroupOrTeacherSelectionPopup(): void {
    this.togglePopup(PopupState.GROUP_OR_TEACHER_SELECTION);
  }

  private togglePopup(popup: PopupState) {
    if (this.isShowingPopup() && this.popupState === popup) {
      this.hidePopup();
      return;
    }
    this.popupState = popup;
    this.showPopup();
  }

  private hidePopup(): void {
    this.showingPopop = false;
  }

  private showPopup(): void {
    this.showingPopop = true;
  }
}
