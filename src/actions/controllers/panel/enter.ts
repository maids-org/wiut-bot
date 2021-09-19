import { TelegrafContext } from "@type/telegraf";
import * as message from "@layouts/messages";

export default async function (ctx: TelegrafContext): Promise<void> {
  await ctx.replyWithHTML(message.panels.entry);
}
