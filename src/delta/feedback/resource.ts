import { InlineKeyboard } from "grammy";

export const message =
  `<b>We are glad seeing you sharing your opinion with us!</b>\n\n` +
  `In order to leave your feedback, you should join our community and leave your feedback at our support topic!`;

export const keyboard = new InlineKeyboard()
  .url(`Leave it here`,
    `https://t.me/madmaids/105348`);