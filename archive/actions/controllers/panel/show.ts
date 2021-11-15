import { TelegrafContext } from "../../../../src/types/telegraf";
import { scheme } from "../../../../src/database/user";
import * as message from "../../../../src/layouts/messages";

export default async function (ctx: TelegrafContext): Promise<void> {
  const templating = async (): Promise<string> => {
    return (
      `<b>🔰 Announcement</b> \n` +
      `\n` +
      `${await scheme[ctx.from.id].messages.join("\n\n")} \n` +
      `\n` +
      `<b>Sincerely, Westmaid!</b> \n`
    );
  };
  try {
    if (scheme[ctx.from.id]) await ctx.replyWithHTML(await templating());
    else await ctx.replyWithHTML(message.panels.noMessage);
  } catch (err) {
    await ctx.replyWithHTML(
      "<b>Oops, there are some issues with formatting!</b>"
    );
    console.log(err);
  }
}
