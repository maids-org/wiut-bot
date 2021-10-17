import { TelegrafContext } from "@type/telegraf";
import { scheme } from "@database/user";
import * as message from "@layouts/messages";
import cursed from "@actions/controllers/confession/cursed";
import encoder from "@actions/controllers/confession/encoder";

export default async function (ctx: TelegrafContext): Promise<void> {
  const templating = async (): Promise<string> => {
    const cleared = await cursed(scheme[ctx.from.id].messages.join("\n"));
    return (
      `<b>🔰 ~ New Message ~</b> \n` +
      `\n` +
      `${cleared} \n` +
      `\n` +
      `<b>Sincerely,</b> #${await encoder(ctx.from.id)} \n`
    );
  };
  try {
    if (scheme[ctx.from.id]) await ctx.replyWithHTML(await templating());
    else await ctx.replyWithHTML(message.confession.noMessageOnShow);
  } catch (err) {
    await ctx.replyWithHTML(
      "<b>Oops, there are some issues with formatting!</b>"
    );
    console.log(err);
  }
}
