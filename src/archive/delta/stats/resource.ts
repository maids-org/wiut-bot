import { Markup } from "telegraf";
import { TelegrafContext } from "@type/telegraf";

export const message = (mod: string, ctx: TelegrafContext, isAdmin: boolean) =>
  `<b>👤 User:</b> ${ctx.from.first_name}` +
  `\n` +
  `<b>👥 Group:</b> ${mod}` +
  `\n` +
  `<b>🚦 Status:</b> ${
    isAdmin ? "Yup... He is an admin." : "Nope... He is a civilian"
  }`;

export const keyboard = Markup.inlineKeyboard([
  [Markup.urlButton(`Other Services Health`, `https://maid.uz/status/`)],
]);
