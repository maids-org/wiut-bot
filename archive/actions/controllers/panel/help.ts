import { TelegrafContext } from "../../../../src/types/telegraf";
import * as message from "../../../../src/layouts/messages";

export default async function (ctx: TelegrafContext): Promise<void> {
  await ctx.replyWithHTML(message.panels.help);
}
