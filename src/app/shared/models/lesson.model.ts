type Subgroup = {
  "name": string,
  "lessonName": string,
  "teacher": string,
  "classroom": string
}

export type Lesson = {
  "date": {"day": number, "monthIndex": number},
  "lessonNumber": string,
  "lessonTime": {"start": string, "end": string},
  "subgroups": Subgroup[]
}