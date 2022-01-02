import { Markup } from "telegraf";

export const message = `<b>Hey, I didn't get this command or message. Please see my command list for more information!</b>`;

export const keyboard = Markup.inlineKeyboard([
  Markup.callbackButton(`Show available commands`, `help`),
]);
