import { Component } from '@angular/core';
import { ChevronSvgComponent } from "../../../shared/components/chevron-svg/chevron-svg.component";
import { NgFor } from '@angular/common';
import { Weekday } from '../../../shared/models/weekday.model';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NgFor, ChevronSvgComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  private weekdaysShortNames = [ // TODO: move to calendar service
    'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'
  ]

  private monthWeeks: Weekday[][] = [
    [
      { num: 26, isSelected: false, isCurrent: false, monthNumber: 8 },
      { num: 27, isSelected: false, isCurrent: false, monthNumber: 8 },
      { num: 28, isSelected: false, isCurrent: false, monthNumber: 8 },
      { num: 29, isSelected: false, isCurrent: false, monthNumber: 8 },
      { num: 30, isSelected: false, isCurrent: false, monthNumber: 8 },
      { num: 31, isSelected: false, isCurrent: false, monthNumber: 8 },
      { num: 1, isSelected: false, isCurrent: false, monthNumber: 9 }
    ],
    [
      { num: 2, isSelected: false, isCurrent: true, monthNumber: 9 },
      { num: 3, isSelected: false, isCurrent: false, monthNumber: 9 },
      { num: 4, isSelected: false, isCurrent: false, monthNumber: 9 },
      { num: 5, isSelected: false, isCurrent: false, monthNumber: 9 },
      { num: 6, isSelected: false, isCurrent: false, monthNumber: 9 },
      { num: 7, isSelected: false, isCurrent: false, monthNumber: 9 },
      { num: 8, isSelected: true, isCurrent: false, monthNumber: 9 }
    ],
    [
      { num: 9, isSelected: false, isCurrent: false, monthNumber: 9 },
      { num: 10, isSelected: false, isCurrent: false, monthNumber: 9 },
      { num: 11, isSelected: false, isCurrent: false, monthNumber: 9 },
      { num: 12, isSelected: false, isCurrent: false, monthNumber: 9 },
      { num: 13, isSelected: false, isCurrent: false, monthNumber: 9 },
      { num: 14, isSelected: false, isCurrent: false, monthNumber: 9 },
      { num: 15, isSelected: false, isCurrent: false, monthNumber: 9 }
    ],
    [
      { num: 16, isSelected: false, isCurrent: false, monthNumber: 9 },
      { num: 17, isSelected: false, isCurrent: false, monthNumber: 9 },
      { num: 18, isSelected: false, isCurrent: false, monthNumber: 9 },
      { num: 19, isSelected: false, isCurrent: false, monthNumber: 9 },
      { num: 20, isSelected: false, isCurrent: false, monthNumber: 9 },
      { num: 21, isSelected: false, isCurrent: false, monthNumber: 9 },
      { num: 22, isSelected: false, isCurrent: false, monthNumber: 9 }
    ],
    [
      { num: 23, isSelected: false, isCurrent: false, monthNumber: 9 },
      { num: 24, isSelected: false, isCurrent: false, monthNumber: 9 },
      { num: 25, isSelected: false, isCurrent: false, monthNumber: 9 },
      { num: 26, isSelected: false, isCurrent: false, monthNumber: 9 },
      { num: 27, isSelected: false, isCurrent: false, monthNumber: 9 },
      { num: 28, isSelected: false, isCurrent: false, monthNumber: 9 },
      { num: 29, isSelected: false, isCurrent: false, monthNumber: 9 }
    ],
    [
      { num: 30, isSelected: false, isCurrent: false, monthNumber: 9 },
      { num: 1, isSelected: false, isCurrent: false, monthNumber: 10 },
      { num: 2, isSelected: false, isCurrent: false, monthNumber: 10 },
      { num: 3, isSelected: false, isCurrent: false, monthNumber: 10 },
      { num: 4, isSelected: false, isCurrent: false, monthNumber: 10 },
      { num: 5, isSelected: false, isCurrent: false, monthNumber: 10 },
      { num: 6, isSelected: false, isCurrent: false, monthNumber: 10 }
    ]
  ]

  public monthString = 'Сентябрь';
  public currentMotnNumber = 9;

  public getMonthWeeks(): Weekday[][] {
    return this.monthWeeks;
  }

  public getWeekdayShortName(dayIndex: number): string {
    return (dayIndex >= 0 && dayIndex <= 6) ? this.weekdaysShortNames[dayIndex] : '?';
  }
}
