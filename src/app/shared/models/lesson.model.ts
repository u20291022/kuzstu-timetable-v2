import { TimetableType } from "../enums/timetable-type.enum"

type Subgroup = {
  "name": string,
  "lessonName": string,
  "teacherOrGroup": string,
  "classroom": string
}

export type Lesson = {
  "date": {"day": number, "monthIndex": number},
  "timetableType": TimetableType,
  "timetableId": string,
  "lessonNumber": string,
  "lessonTime": {"start": string, "end": string},
  "subgroups": Subgroup[]
}