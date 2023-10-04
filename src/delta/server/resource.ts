import { InlineKeyboard } from "grammy";

export const message = (error: boolean, count?: number) =>
  error
    ? `You don't <b>enough privileges</b> to see servers stats`
    : `<b>Groups:</b> <code>${count}</code>`;

export const keyboard = new InlineKeyboard()
  .url(`Other Services Health`, `https://maid.uz/status/`)