import { join } from "path";
import * as fs from "fs";
import fetch from "node-fetch";
import User = Database.User;

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
    protected id: number | string;
    protected messages: string[];
    protected photos: (string | Buffer)[];

    constructor(id: number | string) {
      this.id = id;
      this.messages = [];
      this.photos = [];
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
    protected admins: (string | number)[];
    protected banned: (string | number)[];
    protected database: Offline;
    constructor() {
      this.database = new Offline("users", {
        users: [],
        admins: [],
        banned: [],
      });

      if (this.database.read().users[0] !== null) {
        this.users = this.database.read().users;
      } else {
        this.users = [];
      }

      if (this.database.read().admins[0] !== null) {
        this.admins = this.database.read().admins;
      } else {
        this.admins = [];
      }

      if (this.database.read().banned[0] !== null) {
        this.banned = this.database.read().banned;
      } else {
        this.banned = [];
      }
    }

    addUser(id: number | string): void {
      this.users.push(new User(id));
    }

    addAdmin(user: User): void {
      this.admins.push(user.getId());
      this.database.write({
        admins: this.admins,
        banned: this.banned,
      });
    }

    addBanned(user: User): void {
      this.banned.push(user.getId());
      this.database.write({
        admins: this.admins,
        banned: this.banned,
      });
    }

    getUsers(): User[] {
      return this.users;
    }

    getAdmins(): (string | number)[] {
      return this.admins;
    }

    getBanneds(): (string | number)[] {
      return this.banned;
    }
  }
}

export default Database;

const users = new Database.Users();
const sokhib = new Database.User(2342342);
