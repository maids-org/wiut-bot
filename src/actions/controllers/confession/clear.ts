import { TelegrafContext } from "@type/telegraf";
import { scheme } from "@database/user";
import * as message from "@layouts/messages";

export default async function (ctx: TelegrafContext): Promise<void> {
  try {
    if (scheme[ctx.from.id]) {
      delete scheme[ctx.from.id];
      await ctx.replyWithHTML(message.confession.destroy);
    } else {
      await ctx.replyWithHTML("Ehm, it's already clean you know?");
    }
  } catch {
    await ctx.replyWithHTML("We have some trouble here").catch(null);
  }
}
