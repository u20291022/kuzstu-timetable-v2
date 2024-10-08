import { TimetableType } from "../enums/timetable-type.enum";

export type GroupOrTeacher = {
  name: string;
  id: string;
  type: TimetableType.GROUP | TimetableType.TEACHER;
};