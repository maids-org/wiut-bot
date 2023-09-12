import { Markup } from "telegraf";
import { InlineKeyboardMarkup } from "telegraf/typings/telegram-types";

export const message = `<b>Here are 70+ Family BIS groups & channels:</b>`;

export const keyboard = async (): Promise<InlineKeyboardMarkup> => {
  return Markup.inlineKeyboard([
    [Markup.urlButton(`Announcement Channel`, `https://t.me/madmaids`)],
    // [Markup.urlButton(`General Chat Group (4BIS)`, `https://t.me/BIS_24`)],
    [
      Markup.urlButton(
        `Mad Maids General Community`,
        `https://t.me/madmaids_wiut`,
      ),
    ],
    [Markup.urlButton(`Anime focused chat group`, `https://t.me/wiutanime`)],
  ]);
};
