import { join } from "path";
import { promises } from "fs";
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

    async read(): Promise<any> {
      return JSON.parse(
        await promises.readFile(join(this.path), {
          encoding: "utf8",
        })
      );
    }

    async write(data: any): Promise<any> {
      return await promises.writeFile(join(this.path), JSON.stringify(data), {
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

    async addMessage(message: string): Promise<void> {
      this.messages.push(message);
    }

    async getMessage(index: number): Promise<string> {
      return this.messages[index];
    }

    async getMessages(): Promise<string> {
      return this.messages.join("\n");
    }

    async resetMessages(): Promise<void> {
      this.messages = [];
    }

    async addPhoto(photo: string | Buffer): Promise<void> {
      this.photos.push(photo);
    }

    async getPhoto(index: number): Promise<string | Buffer> {
      return this.photos[index];
    }

    async getPhotos(): Promise<(string | Buffer)[]> {
      return this.photos;
    }

    async resetPhotos(): Promise<void> {
      this.photos = [];
    }

    async getId(): Promise<number | string> {
      return this.id;
    }
  }

  export class Users {
    protected admins: User[];
    protected banned: User[];
    protected database: Offline;
    constructor() {
      this.admins = [];
      this.banned = [];
      this.database = new Offline("users", {
        admins: [],
        banned: [],
      });
    }

    async addAdmin(user: User): Promise<void> {
      this.admins.push(new User(id));
      await this.database.write({
        admins: this.admins.map((user) => user.getId()),
        banned: this.banned.map((user) => user.getId()),
      });
    }

    async addBanned(id: number | string): Promise<void> {
      this.banned.push(new User(id));
      await this.database.write({
        admins: this.admins.map((user) => user.getId()),
        banned: this.banned.map((user) => user.getId()),
      });
    }

    async getAdmins(): Promise<(number | string)[]> {
      return this.admins.map((user) => user.getId());
    }

    async getBanned(): Promise<(number | string)[]> {
      return this.banned.map((user) => user.getId());
    }
  }
}

export default Database;

(async () => {
  const users = new Database.Users();
  await users.addAdmin(1);
  await users.addAdmin(2);
  await users.addBanned(3);
  await users.addBanned(4);
  console.log(await users.getAdmins());
  console.log(await users.getBanned());
})();
