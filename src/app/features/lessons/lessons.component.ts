import { Component } from '@angular/core';
import { LessonComponent } from "./lesson/lesson.component";
import { Lesson } from '../../shared/models/lesson.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [NgIf, NgFor, LessonComponent],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent {
  public lessons: Lesson[] = [
    {
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
    {
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
    {
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
    {
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
    {
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
    }
  ];
}
