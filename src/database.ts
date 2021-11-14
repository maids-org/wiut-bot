import { join } from "path";
import * as fs from "fs";
import fetch from "node-fetch";

namespace Database {
  export const Constants: { [key: string]: string } = {
    EDIT_LINK: "https://github.com/mad-maids/maid.table",
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

    getTimeString(): string {
      return this.time.toLocaleString("en-US", {
        hour12: false,
        timeZone: "UTC",
      });
    }

    getUzbTimeString(): string {
      return this.uzbTime.toLocaleString("uz-Latn-UZ", {
        hour12: false,
        timeZone: "UTC",
      });
    }
  }
}

export default Database;
