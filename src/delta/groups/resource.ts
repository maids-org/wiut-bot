import { Markup } from "telegraf";
import { dungeon } from "@src/core";
import { InlineKeyboardMarkup } from "telegraf/typings/telegram-types";
import { Group } from "@type/dungeon";

export const message =
  "<b>Navigate and choose your own group from the list below.</b>";

export const keyboard = async (page: number): Promise<InlineKeyboardMarkup> => {
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
        "⬅️ Previous",
        `group_${page - 1}`,
        !(data.previous.length > 0 && page > 0)
      ),

      Markup.callbackButton(
        "Next ➡️",
        `group_${page + 1}`,
        !(data.current.length === 10)
      ),
    ],
  ]);
};
