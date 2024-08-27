import { Injectable } from '@angular/core';
import { CalendarService } from './calendar.service';
import { Lesson } from '../../shared/models/lesson.model';
import { Timetable } from '../../shared/models/timetable.model';
import { TimetableType } from '../../shared/enums/timetable-type.enum';
import { SearchType } from '../../shared/enums/search-type.enum';
import { settings } from '../../shared/settings';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  private loadingLessons = false;
  private loadingSearchResults = false;
  private currentTimetable: Timetable = {
    name: 'ИТб-222',
    id: '6479',
    type: TimetableType.GROUP
  };
  private lessons: Lesson[] = [];
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
    
    this.lessons = await new Promise((resolve) => {
      const currentTimetableType = this.currentTimetable.type;
      const currentTimetableId = this.currentTimetable.id;
      switch (currentTimetableType) {
        case TimetableType.GROUP: {
          fetch(`${settings.baseUrl}/timetable/getGroupSchedule/${currentTimetableId}`).then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Failed to fetch group timetables');
            }
          }).then(data => {
            resolve(data)
          });
          break;
        }
        case TimetableType.TEACHER: {
          fetch(`${settings.baseUrl}/timetable/getTeacherSchedule/${currentTimetableId}`).then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Failed to fetch teacher timetables');
            }
          }).then(data => {
            resolve(data)
          });
          break;
        }
        default: {
          resolve([]);
          break;
        }
      }
    });

    this.loadingLessons = false;
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
    return new Promise((resolve) => {
      fetch(`${settings.baseUrl}/timetable/${timetableType}`).then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch timetables');
        }
      }).then(data => {
        resolve(data)
      });
    });
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
