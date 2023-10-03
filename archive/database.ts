import { join } from "path";
import * as fs from "fs";
import { Timetable as TT, Day } from "./types/database";

import Offline from "./provider/offline";

export const Constants: { [key: string]: string } = {
  EDIT_LINK: "https://github.com/mad-maids/maid.felix/",
  TIMETABLE_LINK: "https://hub.maid.uz/t/",
};

export const Online = async (url: string): Promise<any> => {
  const response = await fetch(url);
  return await response.json();
};

export class Users {
  protected users: User[];
  protected admins: User[];
  protected banned: User[];
  protected database: Offline;

  constructor() {
    this.database = new Offline("users", {
      users: [],
    });

    if (this.database.read().users.length !== 0) {
      this.users = this.database.read().users.map((user: any) => {
        return new User(user);
      });
    } else {
      this.users = [];
    }

    this.admins = [];
    this.banned = [];

    this.users.forEach((user: User) => {
      if (user.admin) {
        this.admins.push(user);
      }
      if (user.banned) {
        this.banned.push(user);
      }
    });
  }

  addUser(user: User): void {
    // Check if user already exists
    if (this.users.find((u) => u.getId() === user.getId())) {
      throw new Error("User already exists");
    }

    // Add it to the storage
    this.users.push(user);
    this.database.write({
      users: this.users,
    });
  }

  deleteUser(user: User): void {
    // Check if user exists
    if (!this.users.find((u) => u.getId() === user.getId())) {
      throw new Error("User does not exist");
    }

    // Delete it from the storage
    this.users = this.users.filter((u) => u.getId() !== user.getId());
    this.database.write({
      users: this.users,
    });
  }

  getUser(id: number | string): User {
    return this.users.find((u) => u.getId() === id)!;
  }

  getUsers(): User[] {
    return this.users;
  }

  getAdmins(): User[] {
    return this.admins;
  }

  setAdmin(user: User, value: boolean): void {
    if (!this.users.find((u) => u.getId() === user.getId())) {
      throw new Error("User does not exist");
    }

    this.users.find((u) => u.getId() === user.getId())!.admin = value;

    value
      ? this.admins.push(user)
      : (this.admins = this.admins.filter((u) => u.getId() !== user.getId()));

    this.database.write({
      users: this.users,
    });
  }

  setBanned(user: User, value: boolean): void {
    if (!this.users.find((u) => u.getId() === user.getId())) {
      throw new Error("User does not exist");
    }

    this.users.find((u) => u.getId() === user.getId())!.banned = value;

    value
      ? this.banned.push(user)
      : (this.banned = this.banned.filter((u) => u.getId() !== user.getId()));

    this.database.write({
      users: this.users,
    });
  }
}

export class Timetable {
  protected _level: number;
  protected _module: string;
  protected _group: number;
  protected filePath: string;
  protected timetable: TT;

  constructor(course: string) {
    const data = course.match(/([0-9]+)([A-Z]+)([0-9]+)/);

    this._level = parseInt(data![1]);
    this._module = data![2];
    this._group = parseInt(data![3]);

    this.filePath = join(
      "data",
      "timetable",
      this._level + this._module,
      this._level + this._module + this._group + ".json",
    );

    this.timetable = JSON.parse(fs.readFileSync(this.filePath, "utf8"));
  }

  set level(level: number) {
    this._level = level;
  }

  get level(): number {
    return this._level;
  }

  set module(module: string) {
    this._module = module;
  }

  get module(): string {
    return this._module;
  }

  set group(group: number) {
    this._group = group;
  }

  get group(): number {
    return this._group;
  }

  getAllLessons(): TT {
    return this.timetable;
  }

  getDayLessons(day: string | number | Day): TT | any {
    switch (day) {
      case 0:
      case 7:
      case "Sun":
      case "Sunday":
        return this.timetable[0];
      case 1:
      case "Mon":
      case "Monday":
        return this.timetable[1];
      case 2:
      case "Tue":
      case "Tuesday":
        return this.timetable[2];
      case 3:
      case "Wed":
      case "Wednesday":
        return this.timetable[3];
      case 4:
      case "Thu":
      case "Thursday":
        return this.timetable[4];
      case 5:
      case "Fri":
      case "Friday":
        return this.timetable[5];
      case 6:
      case "Sat":
      case "Saturday":
        return this.timetable[6];
    }
  }

  getTimetableLink(): string {
    return Constants.TIMETABLE_LINK + this._level + this._module;
  }

  getTimetableEditLink(): string {
    return (
      Constants.EDIT_LINK +
      `blob/main/data/${this._level}${this._module}/${this._level}${this._module}${this._group}.json`
    );
  }
}
