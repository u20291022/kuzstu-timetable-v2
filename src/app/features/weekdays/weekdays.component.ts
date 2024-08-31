import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Weekday } from '../../shared/models/weekday.model';
import { CalendarService } from '../../core/services/calendar.service';
import { ChevronSvgComponent } from "../../shared/components/chevron-svg/chevron-svg.component";

@Component({
  selector: 'app-weekdays',
  standalone: true,
  imports: [NgFor, ChevronSvgComponent],
  templateUrl: './weekdays.component.html',
  styleUrl: './weekdays.component.css'
})
export class WeekdaysComponent {
  constructor(private calendarService: CalendarService) {}

  public getWeekdays(): Weekday[] {
    return this.calendarService.getCurrentWeek();
  }

  public getWeekdayShortName(dayIndex: number): string {
    return this.calendarService.getWeekdayShortName(dayIndex);
  }

  public setCurrentWeekdayTo(weekday: Weekday): void {
    this.calendarService.setCurrentWeekdayTo(weekday);
  }
}
