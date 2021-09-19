/**
 * Group Identifier
 * @name group
 * @description return group number from chat id
 * @returns Promise<number>
 */

import { promises } from "fs";
import { join } from "path";

export default async (chat: number | string): Promise<number> => {
  const json = JSON.parse(
    await promises.readFile(join(`./`, `groups.json`), {
      encoding: "utf8",
    })
  );
  return json[chat.toString()];
};
