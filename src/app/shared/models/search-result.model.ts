import { TimetableType } from "../enums/timetable-type.enum";

export type SearchResult = {
  name: string;
  id: string;
  type: TimetableType;
};