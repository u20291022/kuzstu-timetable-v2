import { Injectable } from '@angular/core';
import { Weekday } from '../../shared/models/weekday.model';
import { Lesson } from '../../shared/models/lesson.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private weekdaysShortNames = [
    'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'
  ]
  private currentDate = new Date();
  private viewDate = new Date();

  public getHeaderString(): string {
    const currentDateString = this.currentDate.toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' });
    const isWeekEven = this.isWeekEven(this.getCurrentWeek());
    return `${currentDateString}, ${isWeekEven ? 'чётная' : 'нечётная'} неделя`;
  }

  private isWeekEven(week: Weekday[]): boolean {
    const weekNumber = Math.ceil((week[0].num + 6) / 7);
    return weekNumber % 2 === 0;
  }

  public getWeekdayShortNames(): string[] {
    return this.weekdaysShortNames;
  }

  public getWeekdayShortName(dayIndex: number): string {
    return (dayIndex >= 0 && dayIndex <= 6) ? this.weekdaysShortNames[dayIndex] : '?';
  }

  public getCurrentMonthName(): string {
    return this.viewDate.toLocaleString('ru', { month: 'long' })
      .replace(/(^|\s)\S/g, (firstLetter) => firstLetter.toUpperCase());
  }

  public isLessonToday(lesson: Lesson): boolean {
    return lesson.date.day === this.currentDate.getDate() && lesson.date.monthIndex === this.currentDate.getMonth();
  }

  public getCurrentMonthWeeks(): Weekday[][] {
    const monthWeekdays: Weekday[][] = [];

    const currentMonth = this.viewDate.getMonth();
    const date = new Date(this.viewDate);
    date.setDate(1);

    while (date.getMonth() === currentMonth) {
      const week = this.getWeek(date.getDate(), date.getMonth(), date.getFullYear());
      monthWeekdays.push(week);
      date.setDate(date.getDate() + 7);
      if (date.getMonth() !== currentMonth) {
        const lastWeek = this.getWeek(date.getDate(), date.getMonth(), date.getFullYear());
        if (lastWeek.some(day => day.inCurrentMonth)) {
          monthWeekdays.push(lastWeek);
        }
      }
    }

    return monthWeekdays;
  }

  public getCurrentWeek(): Weekday[] {
    return this.getWeek(this.currentDate.getDate(), this.currentDate.getMonth());
  }

  private getWeek(day: number, monthIndex: number, year?: number): Weekday[] {
    const currentDate = new Date(year || new Date().getFullYear(), monthIndex, day);
    const currentWeek: Weekday[] = [];
    const currentWeekDayIndex = (currentDate.getDay() || 7) - 1; // monday is zero and sunday is 6
    const dayInCurrentMonth = currentDate.getDate();

    for (let i = 0; i < 7; i++) {
      const day = (dayInCurrentMonth - currentWeekDayIndex) + i;
      const date = new Date(currentDate);
      date.setDate(day);
      const weekday: Weekday = {
        num: date.getDate(),
        isSelected: date.getDate() === this.currentDate.getDate() && date.getMonth() === this.currentDate.getMonth(),
        isToday: date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth(),
        inCurrentMonth: date.getMonth() === this.viewDate.getMonth(),
        monthNumber: date.getMonth()
      };
      currentWeek.push(weekday);
    }

    return currentWeek;
  }

  public setCurrentWeekdayTo(weekday: Weekday): void {
    if (this.viewDate.getMonth() === 11 && weekday.monthNumber === 0) return;
    if (this.viewDate.getMonth() === 0 && weekday.monthNumber === 11) return;
    this.currentDate.setFullYear(new Date().getFullYear());
    this.currentDate.setDate(1);
    this.currentDate.setMonth(weekday.monthNumber);
    this.currentDate.setDate(weekday.num);
  }

  public setNextMonth(): void {
    const currentMonth = this.viewDate.getMonth();
    if (currentMonth === 11) return;
    this.viewDate.setDate(1);
    this.viewDate.setMonth(this.viewDate.getMonth() + 1);
  }

  public setPrevMonth(): void {
    const currentMonth = this.viewDate.getMonth();
    if (currentMonth === 0) return;
    this.viewDate.setDate(1);
    this.viewDate.setMonth(this.viewDate.getMonth() - 1);
  }

  public setNextWeek(): void {
    const currentDay = (this.currentDate.getDay() || 7) - 1;
    const newDate = this.currentDate.getDate() + (7 - currentDay);
    if (this.currentDate.getMonth() !== 11 || newDate <= 31) {
      this.currentDate.setDate(newDate);
      this.viewDate.setDate(newDate);
    }
  }

  public setPrevWeek(): void {
    const currentDay = (this.currentDate.getDay() || 7) - 1;
    const newDate = this.currentDate.getDate() - (7 + currentDay);
    if (this.currentDate.getMonth() !== 0 || newDate >= 1) {
      this.currentDate.setDate(newDate);
      this.viewDate.setDate(newDate);
    }
  }

  public setNextDay(): void {
    const newDate = this.currentDate.getDate() + 1;
    if (this.currentDate.getMonth() !== 11 || newDate <= 31) {
      this.currentDate.setDate(newDate);
      this.viewDate.setDate(newDate);
    }
  }

  public setPrevDay(): void {
    const newDate = this.currentDate.getDate() - 1;
    if (this.currentDate.getMonth() !== 0 || newDate >= 1) {
      this.currentDate.setDate(newDate);
      this.viewDate.setDate(newDate);
    }
  }
}
