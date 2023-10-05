import { Day, Lesson, Timetable as TT } from "@/types/database";
import { join } from "node:path";
import fs from "node:fs";
import { Constants } from "@/providers/consts";

class Timetable {
  protected _level: string;
  protected _module: string;
  protected _group: string;
  protected filePath: string;
  protected timetable: TT;

  constructor(course: string) {
    const parser = new RegExp(/([0-9]+)([A-Z]+)([0-9]+)/gi);
    const data = parser.exec(course);

    this._level = data![1];
    this._module = data![2];
    this._group = data![3];

    this.filePath = join(
      "data",
      "timetable",
      this._level + this._module.toUpperCase(),
      this._level + this._module + this._group + ".json",
    );

    this.timetable = JSON.parse(fs.readFileSync(this.filePath, "utf8"));
  }

  set level(level: string) {
    this._level = level;
  }

  get level(): string {
    return this._level;
  }

  set module(module: string) {
    this._module = module;
  }

  get module(): string {
    return this._module;
  }

  set group(group: string) {
    this._group = group;
  }

  get group(): string {
    return this._group;
  }

  getAllLessons(): TT {
    return this.timetable;
  }

  getDayLessons(day: string | number | Day): Lesson[] | undefined {
    switch (day) {
      case 0:
      case 7:
      case "Sun":
      case "Sunday":
        return this.timetable["sunday"];
      case 1:
      case "Mon":
      case "Monday":
        return this.timetable["monday"];
      case 2:
      case "Tue":
      case "Tuesday":
        return this.timetable["tuesday"];
      case 3:
      case "Wed":
      case "Wednesday":
        return this.timetable["wednesday"];
      case 4:
      case "Thu":
      case "Thursday":
        return this.timetable["thursday"];
      case 5:
      case "Fri":
      case "Friday":
        return this.timetable["friday"];
      case 6:
      case "Sat":
      case "Saturday":
        return this.timetable["saturday"];
    }

    return undefined;
  }

  getTimetableLink(): string {
    return Constants.TIMETABLE_LINK + this._level + this._module;
  }

  getTimetableEditLink(): string {
    return (
      Constants.EDIT_LINK +
      `blob/main/timetable/${
        this._level
      }${this._module.toUpperCase()}/${this._level.toUpperCase()}${
        this._module
      }${this._group}.json`
    );
  }
}

export default Timetable;
