import { Injectable } from '@angular/core';
import { CalendarService } from './calendar.service';
import { Lesson } from '../../shared/models/lesson.model';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  private loadingLessons = false;

  constructor(private calendarService: CalendarService) {}

  private lessons: Lesson[] = [
    {
      "date": {"day": 1, "monthIndex": 8},
      "lessonNumber": "1",
      "lessonTime": {"start": "9:00", "end": "10:30"},
      "subgroups": [
        {
          "name": "1 п/г",
          "lessonName": "лаб. Теория автоматического управления",
          "teacher": "Симикова А.А.",
          "classroom": "Ауд. 3305"
        },
        {
          "name": "2 п/г",
          "lessonName": "лаб. Теория информационных процессов и систем",
          "teacher": "Николаев П.И.",
          "classroom": "Ауд. 3302"
        }
      ]
    },
  ];

  public isLoadingLessons(): boolean {
    return this.loadingLessons;
  }

  public getLessons(): Lesson[] {
    return this.lessons.filter(lesson => this.calendarService.isLessonToday(lesson));
  }
}
