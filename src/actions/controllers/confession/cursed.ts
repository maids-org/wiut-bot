import curses from "@database/curses";

export default async function (message: string): Promise<string> {
  const modifier = message;
  for (const curse of curses) {
    if (modifier.toLowerCase().includes(curse)) {
      const reg = new RegExp(curse, "ig");
      modifier.replace(reg, "*".repeat(curse.length));
    }
  }
  return modifier;
}
