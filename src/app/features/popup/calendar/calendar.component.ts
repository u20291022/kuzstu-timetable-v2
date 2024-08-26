import { Component } from '@angular/core';
import { ChevronSvgComponent } from "../../../shared/components/chevron-svg/chevron-svg.component";
import { NgFor } from '@angular/common';
import { Weekday } from '../../../shared/models/weekday.model';
import { CalendarService } from '../../../core/services/calendar.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NgFor, ChevronSvgComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  constructor(private calendarService: CalendarService) {}

  public getMonthName(): string {
    return this.calendarService.getCurrentMonthName();
  }

  public getMonthWeeks(): Weekday[][] {
    return this.calendarService.getCurrentMonthWeeks();
  }

  public getWeekdayShortNames(): string[] {
    return this.calendarService.getWeekdayShortNames();
  }

  public selectDay(weekday: Weekday): void {
    this.calendarService.setCurrentWeekdayTo(weekday);
  }

  public setNextMonth(): void {
    this.calendarService.setNextMonth();
  }

  public setPrevMonth(): void {
    this.calendarService.setPrevMonth();
  }
}
