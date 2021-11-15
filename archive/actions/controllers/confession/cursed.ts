import curses from "../../../../src/database/curses";

export default async function (message: string): Promise<string> {
  return curses.censor(message.replace(/(?:https?|ftp):\/\/[\n\S]+/g, ""));
}
