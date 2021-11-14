import { join } from "path";
import * as fs from "fs";
import fetch from "node-fetch";

namespace Database {
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
      }
      //
      // this._id = id;
      // this.messages = [];
      // this.photos = [];
      // this._admin = false;
      // this._banned = false;
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

      this.users.forEach((user) => {
        if (user.admin) {
          this.admins.push(user);
        }
        if (user.banned) {
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

    health(): void {
      console.log("file event read:", this.database.read());
      console.log("class event read:", this.users);
      console.log("admins", this.admins);
      console.log("banned", this.banned);
    }
  }
}

export default Database;

const users = new Database.Users();
const sokhib = new Database.User(2342342);
users.addUser(sokhib);
users.health();
