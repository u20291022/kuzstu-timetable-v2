import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Weekday } from '../../shared/models/weekday.model';

@Component({
  selector: 'app-weekdays',
  standalone: true,
  imports: [NgFor],
  templateUrl: './weekdays.component.html',
  styleUrl: './weekdays.component.css'
})
export class WeekdaysComponent {
  private weekdaysShortNames = [ // TODO: move to calendar service
    'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'
  ]

  public weekdays: Weekday[] = [
    { num: 2, isSelected: false, isCurrent: true, monthNumber: 9 },
    { num: 3, isSelected: false, isCurrent: false, monthNumber: 9 },
    { num: 4, isSelected: false, isCurrent: false, monthNumber: 9 },
    { num: 5, isSelected: false, isCurrent: false, monthNumber: 9 },
    { num: 6, isSelected: false, isCurrent: false, monthNumber: 9 },
    { num: 7, isSelected: false, isCurrent: false, monthNumber: 9 },
    { num: 8, isSelected: true, isCurrent: false, monthNumber: 9 },
  ];

  public getWeekdays(): Weekday[] {
    return this.weekdays;
  }

  public getWeekdayShortName(dayIndex: number): string {
    return (dayIndex >= 0 && dayIndex <= 6) ? this.weekdaysShortNames[dayIndex] : '?';
  }
}
