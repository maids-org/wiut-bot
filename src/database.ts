import { join } from "path";
import * as fs from "fs";
import fetch from "node-fetch";
import { Timetable as TT, Day } from "@type/database";
import { Profanity } from "@2toad/profanity";

export const Constants: { [key: string]: string } = {
  EDIT_LINK: "https://github.com/mad-maids/maid.table/",
  TIMETABLE_LINK: "https://hub.maid.uz/t/",
};

export const Online = async (url: string): Promise<any> => {
  const response = await fetch(url);
  return await response.json();
};

export class Offline {
  protected path: string;
  protected type: string;

  constructor(type: string, defaults: any) {
    this.type = type;

    if (!fs.existsSync(join("data"))) fs.mkdirSync(join("data"));

    if (!fs.existsSync(join("data", `${this.type}.json`)))
      fs.writeFileSync(
        join("data", `${this.type}.json`),
        JSON.stringify(defaults)
      );

    this.path = join("data", `${type}.json`);
  }

  read(): any {
    return JSON.parse(
      fs.readFileSync(join(this.path), {
        encoding: "utf8",
      })
    );
  }

  write(data: any): any {
    fs.writeFileSync(join(this.path), JSON.stringify(data), {
      encoding: "utf8",
    });
  }
}

export class User {
  protected _id: number | string;
  protected messages: string[];
  protected photos: (string | Buffer)[];
  protected _admin: boolean;
  protected _banned: boolean;

  constructor(data?: number | any) {
    if (typeof data === "number") {
      this._id = data;
      this.messages = [];
      this.photos = [];
      this._admin = false;
      this._banned = false;
    } else if (typeof data === "object") {
      this._id = data._id;
      this.messages = data.messages;
      this.photos = data.photos;
      this._admin = data._admin;
      this._banned = data._banned;
    } else throw new Error("Invalid data type");
  }

  set id(id: number | string) {
    this._id = id;
  }

  get id(): number | string {
    return this._id;
  }

  set admin(value: boolean) {
    this._admin = value;
  }

  get admin(): boolean {
    return this._admin;
  }

  set banned(value: boolean) {
    this._banned = value;
  }

  get banned(): boolean {
    return this._banned;
  }

  addMessage(message: string): void {
    this.messages.push(message);
  }

  getMessage(index: number): string {
    return this.messages[index];
  }

  getMessages(): string {
    return this.messages.join("\n");
  }

  resetMessages(): void {
    this.messages = [];
  }

  addPhoto(photo: string | Buffer): void {
    this.photos.push(photo);
  }

  getPhoto(index: number): string | Buffer {
    return this.photos[index];
  }

  getPhotos(): (string | Buffer)[] {
    return this.photos;
  }

  resetPhotos(): void {
    this.photos = [];
  }

  getId(): number | string {
    return this.id;
  }
}

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

    this.users.forEach((user: User) => {
      if (user.admin) {
        this.admins = [];
        this.admins.push(user);
      }
      if (user.banned) {
        this.banned = [];
        this.banned.push(user);
      }
    });

    if (this.admins === undefined) {
      this.admins = [];
    }

    if (this.banned === undefined) {
      this.banned = [];
    }
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
    return this.users.find((u) => u.getId() === id);
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

    this.users.find((u) => u.getId() === user.getId()).admin = value;

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

    this.users.find((u) => u.getId() === user.getId()).banned = value;

    value
      ? this.banned.push(user)
      : (this.banned = this.banned.filter((u) => u.getId() !== user.getId()));

    this.database.write({
      users: this.users,
    });
  }
}

export class Time {
  protected time: Date;
  protected uzbTime: Date;

  constructor() {
    this.time = new Date();
    this.uzbTime = new Date();
    this.uzbTime.setHours(this.time.getUTCHours() + 5);
  }

  updateTime(): void {
    this.time = new Date();
    this.uzbTime = new Date();
    this.uzbTime.setHours(this.time.getUTCHours() + 5);
  }

  getTime(): Date {
    return this.time;
  }

  getUzbTime(): Date {
    return this.uzbTime;
  }

  getTimeString(isTomorrow: boolean): string {
    switch (isTomorrow) {
      case false:
        return this.getTime().getDay().toString();
      case true:
        return (this.getTime().getDay() + 1).toString();
    }
  }

  getUzbTimeString(isTomorrow): string {
    switch (isTomorrow) {
      case false:
        return this.getUzbTime().getDay().toString();
      case true:
        return (this.getUzbTime().getDay() + 1).toString();
    }
  }
}

export class Timetable {
  protected _level: number;
  protected _module: string;
  protected _group: number;
  protected filePath: string;
  protected timetable: TT;

  constructor(course: string) {
    this._level = parseInt(course.match(/([0-9]+)([A-Z]+)([0-9]+)/)[1]);
    this._module = course.match(/([0-9]+)([A-Z]+)([0-9]+)/)[2];
    this._group = parseInt(course.match(/([0-9]+)([A-Z]+)([0-9]+)/)[3]);
    this.filePath = join(
      "timetable",
      this._level + this._module,
      this._level + this._module + this._group + ".json"
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

export class Censorship {
  protected profanity: Profanity;
  protected words = [
    "fuck",
    "fxck",
    "motherfucker",
    "mazafaka",
    "dumbass",
    "sex",
    "xxx",
    "ass",
    "tits",
    "boob",
    "boobs",
    "bastard",
    "dick",
    "asshole",
    "bitch",
    "damn",
    "cunt",
  ];

  constructor() {
    this.profanity = new Profanity();
    this.profanity.addWords(this.words);
  }

  clearLinks(message: string) {
    return message.replace(/(?:https?|ftp):\/\/[\n\S]+/g, "");
  }

  clearProfanity(message: string) {
    return this.profanity.censor(message);
  }

  cleanAll(message: string) {
    return this.clearProfanity(this.clearLinks(message));
  }
}
