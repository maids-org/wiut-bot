import { join } from "path";
import { promises } from "fs";
import * as fs from "fs";
import fetch from "node-fetch";
// import Dungeon from "@src/dungeon";

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
}

export default Database;
