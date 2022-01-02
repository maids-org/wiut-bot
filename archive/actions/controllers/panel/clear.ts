import { TelegrafContext } from "../../../../src/types/telegraf";
import { scheme } from "../../../../src/database/user";
import * as message from "../../../../src/layouts/messages";

export default async function (ctx: TelegrafContext): Promise<void> {
  try {
    if (scheme[ctx.from.id]) {
      delete scheme[ctx.from.id];
      await ctx.replyWithHTML(message.panels.destroy);
    } else {
      await ctx.replyWithHTML("Ehm, it's already clean you know?");
    }
  } catch {
    await ctx.replyWithHTML("We have some trouble here").catch(null);
  }
}