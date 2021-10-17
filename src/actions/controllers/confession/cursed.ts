import curses from "@database/curses";

export default async function (message: string): Promise<string> {
  return curses.clean(message);
}
