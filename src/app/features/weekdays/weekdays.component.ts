import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Weekday } from '../../shared/models/weekday.model';
import { CalendarService } from '../../core/services/calendar.service';
import { ChevronSvgComponent } from "../../shared/components/chevron-svg/chevron-svg.component";

@Component({
  selector: 'app-weekdays',
  standalone: true,
  imports: [NgIf, NgFor, ChevronSvgComponent],
  templateUrl: './weekdays.component.html',
  styleUrl: './weekdays.component.css'
})
export class WeekdaysComponent {
  private startX: number = 0;
  private swipingRight: boolean = false;
  private swipingLeft: boolean = false;

  constructor(private calendarService: CalendarService) {}

  public isSwipingRight(): boolean {
    return this.swipingRight;
  }

  public isSwipingLeft(): boolean {
    return this.swipingLeft;
  }

  public getWeekdays(): Weekday[] {
    return this.calendarService.getCurrentWeek();
  }

  public getWeekdayShortName(dayIndex: number): string {
    return this.calendarService.getWeekdayShortName(dayIndex);
  }

  public setCurrentWeekdayTo(weekday: Weekday): void {
    this.calendarService.setCurrentWeekdayTo(weekday);
  }

  public onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
  }

  public onTouchMove(event: TouchEvent): void {
    event.preventDefault();

    const x = event.touches[0].clientX;
    const deltaX = x - this.startX;
    if (Math.abs(deltaX) > 0) {
      const weekdaysElement = document.getElementsByClassName('weekdays')[0] as HTMLElement;
      const rightArrow = document.getElementsByClassName('right-arrow')[0] as HTMLElement;
      const leftArrow = document.getElementsByClassName('left-arrow')[0] as HTMLElement;
      const translateValue = Math.min(25, Math.max(-25, deltaX / 3));
      
      weekdaysElement.style.transform = `translateX(${translateValue}px)`;
      rightArrow.style.transform = `translateX(${-translateValue}px) rotate(180deg)`;
      leftArrow.style.transform = `translateX(${-translateValue}px)`;
      rightArrow.style.opacity = `${Math.min(1, Math.max(0, ((-1*translateValue)-10) / 15))}`;
      leftArrow.style.opacity = `${Math.min(1, Math.max(0, (translateValue-10) / 15))}`;

      if (Math.abs(translateValue) < 25) {
        this.swipingRight = false;
        this.swipingLeft = false;
        leftArrow.style.backgroundColor = `transparent`;
        rightArrow.style.backgroundColor = `transparent`;
      }
      else {
        if (deltaX > 0) {
          this.swipingLeft = true;
          leftArrow.style.backgroundColor = `var(--active-color)`;
        }
        else {
          this.swipingRight = true;
          rightArrow.style.backgroundColor = `var(--active-color)`;
        }
      }
    }
  }

  public onTouchEnd(): void {
    if (this.isSwipingRight()) {
      this.onSwipeRight();
    } else if (this.isSwipingLeft()) {
      this.onSwipeLeft();
    }

    this.startX = 0;
    this.swipingRight = false;
    this.swipingLeft = false;

    const weekdaysElement = document.getElementsByClassName('weekdays')[0] as HTMLElement;
    const rightArrow = document.getElementsByClassName('right-arrow')[0] as HTMLElement;
    const leftArrow = document.getElementsByClassName('left-arrow')[0] as HTMLElement;
    weekdaysElement.style.transform = `translateX(0px)`;
    rightArrow.style.transform = `translateX(0px) rotate(180deg)`;
    leftArrow.style.transform = `translateX(0px)`;
    rightArrow.style.opacity = `0`;
    leftArrow.style.opacity = `0`;
    leftArrow.style.backgroundColor = `transparent`;
    rightArrow.style.backgroundColor = `transparent`;
  }

  private onSwipeLeft() {
    this.calendarService.setPrevWeek();
  }

  private onSwipeRight() {
    this.calendarService.setNextWeek();
  }
}
