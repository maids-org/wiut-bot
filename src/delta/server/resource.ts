import { Markup } from "telegraf";

export const message = (error: boolean, count?: number) =>
  error
    ? `You don't enough privileges to see servers stats`
    : `Groups: ${count}`;

export const keyboard = Markup.inlineKeyboard([
  [Markup.urlButton(`Other Services Health`, `https://maid.uz/status/`)],
]);
