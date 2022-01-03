import { Markup } from "telegraf";
import { InlineKeyboardMarkup } from "telegraf/typings/telegram-types";
import { Group } from "@type/dungeon";
import Dungeon from "@src/dungeon";

export const message =
  "Navigate and choose your own group from the list below.";

export const keyboard = async (page: number): Promise<InlineKeyboardMarkup> => {
  const dungeon = new Dungeon();

  const data = {
    previous: await dungeon.getAllByCursor(page - 1),
    current: await dungeon.getAllByCursor(page),
    next: await dungeon.getAllByCursor(page + 1),
  };

  return Markup.inlineKeyboard([
    ...data.current.map((group: Group) => [
      Markup.urlButton(group.module, group.link),
    ]),
    [
      Markup.callbackButton(
        data.previous.length > 0 && page !== 0 ? "⬅️ Previous" : "⬅️",
        `group_${data.previous.length > 0 ? page - 1 : page}`
      ),
      Markup.callbackButton(
        data.next.length > 0 ? "Next ➡️" : "➡️",
        `group_${data.next.length > 0 ? page + 1 : page}`
      ),
    ],
  ]);
};
