import { Markup } from "telegraf";

export const message =
  `<b>We are glad seeing you sharing your opinion with us!</b>\n\n` +
  `In order to leave your feedback, you should have GitHub account registered and follow the link below if you have one!`;

export const keyboard = Markup.inlineKeyboard([
  [
    Markup.urlButton(
      `Leave it here`,
      `https://github.com/mad-maids/maid.discussion/discussions`
    ),
  ],
]);
