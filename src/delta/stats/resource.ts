import { MaidContext } from "@type/global";
import { InlineKeyboard } from "grammy";

export const message = (mod: string, ctx: MaidContext, isAdmin: boolean) =>
  `<b>👤 User:</b> ${ctx.from!.first_name}` +
  `\n` +
  `<b>👥 Group:</b> ${mod}` +
  `\n` +
  `<b>🚦 Status:</b> ${
    isAdmin ? "Yup... He is an admin." : "Nope... He is a civilian"
  }`;

export const keyboard = new InlineKeyboard()
.url('Other Services Health', 'https://maid.uz/status/')