export interface Lesson {
  name: string;
  tutor: string;
  type: "online" | "seminar" | "lecture" | "workshop";
  start:
    | 1.0
    | 2.0
    | 3.0
    | 4.0
    | 5.0
    | 6.0
    | 7.0
    | 8.0
    | 9.0
    | 10.0
    | 11.0
    | 12.0
    | 13.0
    | 14.0
    | 15.0
    | 16.0
    | 17.0
    | 18.0
    | 19.0
    | 20.0
    | 21.0
    | 22.0
    | 23.0
    | 24.0;
  length: 1.0 | 2.0 | 3.0 | 4.0;
  location: string;
}

export interface Timetable {
  [key: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7"]: Lesson[];
}

export type Day =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | "Mon"
  | "Tue"
  | "Wed"
  | "Thu"
  | "Fri"
  | "Sat"
  | "Sun"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";
