import { Markup } from "telegraf";
import { dungeon } from "@src/core";
import { InlineKeyboardMarkup } from "telegraf/typings/telegram-types";
import { Group } from "@type/dungeon";

export const message = (isEdited: boolean, page?: number | string) =>
  isEdited
    ? `<b>Navigate and choose your own group from ${page.toString()}th page list below.</b>`
    : "<b>Navigate and choose your own group from the list below.</b>";

export const keyboard = async (page: number): Promise<InlineKeyboardMarkup> => {
  const data = {
    previous: await dungeon.getAllVisibleByCursor(10, (page - 1) * 10),
    current: await dungeon.getAllVisibleByCursor(10, page * 10),
    next: await dungeon.getAllVisibleByCursor(10, (page + 1) * 10),
  };

  return Markup.inlineKeyboard([
    ...data.current.map((group: Group) => [
      Markup.urlButton(group.module, group.link),
    ]),
    [
      Markup.callbackButton(
        "⬅️ Previous",
        `groups_${page - 1}`,
        !(data.previous.length > 0 && page > 0)
      ),

      Markup.callbackButton(
        "Next ➡️",
        `groups_${page + 1}`,
        !(data.current.length === 10)
      ),
    ],
  ]);
};
