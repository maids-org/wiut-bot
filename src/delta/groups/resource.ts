import { Group } from "@/types/dungeon";
import { InlineKeyboard } from "grammy";
import { Parser } from "@type/global";
import Dungeon from "@/providers/dungeon";

export const parsers: Parser = {
  query: /groups_(.+)/gi,
};

export const message = (isEdited: boolean, page?: number | string) =>
  isEdited
    ? `<b>Navigate and choose your own group from ${page!.toString()}th page list below.</b>`
    : "<b>Navigate and choose your own group from the list below.</b>";

export const keyboard = async (dungeon: Dungeon, page: number = 0): Promise<InlineKeyboard> => {
  const data = {
    previous: await dungeon.getAllVisibleByCursor(10, (page - 1) * 10),
    current: await dungeon.getAllVisibleByCursor(10, page * 10),
    next: await dungeon.getAllVisibleByCursor(10, (page + 1) * 10),
  };

  const keyboard = new InlineKeyboard();

  data.current.map((group: Group) => {
    keyboard.url(group.module!, group.link!);
    keyboard.row();
  });

  if (data.previous.length > 0 && page > 0) {
    keyboard.text("⬅️ Previous", `groups_${page - 1}`);
  }

  if (data.next.length > 0 && data.current.length === 10) {
    keyboard.text("Next ➡️", `groups_${page + 1}`);
  }

  return keyboard;
};
