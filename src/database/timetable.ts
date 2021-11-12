/**
 * Group Timetable Database Extractor
 * @name time database
 * @description extract timetable for a bis group
 * @param {string} chat
 */
import groups from "./group";
import { promises } from "fs";
import { join } from "path";
import fetch from "node-fetch";

interface Day {
  name: string;
  tutor: string;
  type: string;
  start: number;
  length: number;
  location: string;
}

interface Timetable {
  [key: string]: Day[];
}

export default async (chat: string | number): Promise<Timetable> => {
  const data = await fetch(
    `https://maid-dungeon.vercel.app/groups/id/${chat}`
  ).then((res) => res.json());
  const chatString = data.module;

  const course = chatString.match(/([0-9]+)([A-Z]+)([0-9]+)/);
  const filePath = await promises.readFile(
    join(
      `./timetable/${course[1]}${course[2]}`,
      `${course[1]}${course[2]}${course[3]}.json`
    ),
    {
      encoding: "utf8",
    }
  );
  return JSON.parse(filePath);
};
