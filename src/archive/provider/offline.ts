import fs from "fs";
import { join } from "path";

class Offline {
  protected path: string;
  protected type: string;

  constructor(type: string, defaults: any) {
    this.type = type;

    if (!fs.existsSync(join("data"))) fs.mkdirSync(join("data"));

    if (!fs.existsSync(join("data", `${this.type}.json`)))
      fs.writeFileSync(
        join("data", `${this.type}.json`),
        JSON.stringify(defaults),
      );

    this.path = join("data", `${type}.json`);
  }

  read(): any {
    return JSON.parse(
      fs.readFileSync(join(this.path), {
        encoding: "utf8",
      }),
    );
  }

  write(data: any): any {
    fs.writeFileSync(join(this.path), JSON.stringify(data), {
      encoding: "utf8",
    });
  }
}

export default Offline;
