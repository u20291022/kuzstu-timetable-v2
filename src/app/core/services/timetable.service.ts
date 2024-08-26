import { Injectable } from '@angular/core';
import { CalendarService } from './calendar.service';
import { Lesson } from '../../shared/models/lesson.model';
import { Timetable } from '../../shared/models/timetable.model';
import { TimetableType } from '../../shared/enums/timetable-type.enum';
import { SearchType } from '../../shared/enums/search-type.enum';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  private loadingLessons = false;
  private loadingSearchResults = false;
  private currentTimetable: Timetable = {
    name: 'ИТб-222',
    id: '1',
    type: TimetableType.GROUP
  };
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
  private defaultSearchResults: Timetable[] = [ 
    { name: 'Расписание группы', id: '', type: TimetableType.GROUP },
    { name: 'Расписание преподавателя', id: '', type: TimetableType.TEACHER },
    { name: 'Расписание аудитории', id: '', type: TimetableType.CLASSROOM },
  ];
  private timetables: { [key in TimetableType]: Timetable[] } = {
    [TimetableType.GROUP]: [],
    [TimetableType.TEACHER]: [],
    [TimetableType.CLASSROOM]: []
  };

  constructor(private calendarService: CalendarService) {
    const defaultGroupOrTeacher = localStorage.getItem('defaultGroupOrTeacher');
    if (defaultGroupOrTeacher) {
      this.currentTimetable = JSON.parse(defaultGroupOrTeacher);
    }
    this.fetchLessons();
  }

  public async fetchLessons(): Promise<void> {
    this.loadingLessons = true;
    setTimeout(() => {
      this.loadingLessons = false;
    }, 2000);
  }

  public async getMultipleTimetable(searchTypes: SearchType[]): Promise<Timetable[]> {
    const timetables: Timetable[] = [];

    for (const searchType of searchTypes) {
      const currentTimetables = await this.getTimetables(searchType); 
      timetables.push(...currentTimetables);
    }

    return timetables;
  }

  public async getTimetables(searchType: SearchType): Promise<Timetable[]> {
    if (searchType === SearchType.NONE) {
      return [];
    }

    const timetableType = searchType.toString() as TimetableType;
    if (this.timetables[timetableType].length === 0) {
      this.loadingSearchResults = true;
      this.timetables[timetableType] = await this.fetchTimetables(timetableType);
      this.loadingSearchResults = false;
    }

    return this.timetables[timetableType];
  }

  private async fetchTimetables(timetableType: TimetableType): Promise<Timetable[]> {
    if (timetableType === TimetableType.GROUP) {
      return [
        { name: 'ИТб-222', id: '222', type: TimetableType.GROUP },
        { name: 'ИТб-221', id: '221', type: TimetableType.GROUP },
      ];
    }

    return [
      { name: "test", id: "123", type: TimetableType.GROUP },
    ];
  }

  public isLoadingLessons(): boolean {
    return this.loadingLessons;
  }

  public getLessons(): Lesson[] {
    return this.lessons.filter(lesson => this.calendarService.isLessonToday(lesson));
  }
  
  public getCurrentTimetableName(): string {
    return this.currentTimetable.name;
  }

  public setTimetableTo(timetable: Timetable): void {
    this.currentTimetable = timetable;
  }

  public isLoadingSearchResults(): boolean {
    return this.loadingSearchResults;
  }

  public getDefaultSearchResults(): Timetable[] {
    return this.defaultSearchResults;
  }
}
