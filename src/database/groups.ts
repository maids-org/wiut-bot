import { promises } from "fs";
import { join } from "path";

export default async (): Promise<(number | string)[]> => {
  const json = JSON.parse(
    await promises.readFile(join(`./`, `groups.json`), {
      encoding: "utf8",
    })
  );
  return Object.keys(json).map((obj) => parseInt(obj));
};
