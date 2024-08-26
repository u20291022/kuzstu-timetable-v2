import { TimetableType } from "../enums/timetable-type.enum";

export type Timetable = {
  name: string;
  id: string;
  type: TimetableType;
};