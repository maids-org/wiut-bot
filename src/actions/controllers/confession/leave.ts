import { TelegrafContext } from "@type/telegraf";
import { scheme, used } from "@database/user";
import * as message from "@layouts/messages";
import encoder from "@actions/controllers/confession/encoder";
import cursed from "@actions/controllers/confession/cursed";
import { Markup } from "telegraf";

// If you want to send all groups
// import groups from "@database/groups";

export default async function (ctx: TelegrafContext): Promise<void> {
  const templating = async (): Promise<string> => {
    const cleared = await cursed(scheme[ctx.from.id].messages.join("\n"));
    return (
      `<b>🔰 #${await encoder(ctx.from.id)}</b> \n` +
      `\n` +
      `${cleared} \n` +
      `\n` +
      `<b>Sincerely, Westmaid!</b> \n`
    );
  };

  if (scheme[ctx.from.id]) {
    await ctx.replyWithHTML(await templating());
    // for (const group of await groups()) {
    //   await ctx.telegram.sendMessage(group, await templating(), {
    //     parse_mode: "HTML",
    //   });
    // }

    try {
      await ctx.telegram.sendMessage(
        process.env.CONFESSION,
        await templating(),
        {
          parse_mode: "HTML",
        }
      );
      await ctx.replyWithHTML(message.confession.leave, {
        reply_markup: Markup.inlineKeyboard([
          Markup.urlButton(`Checkout the channel`, `https://t.me/maidession`),
        ]),
      });
      delete scheme[ctx.from.id];
      used.push(ctx.from.id);
    } catch (e) {
      await ctx.replyWithHTML(
        `We had some problems with sending the message\n${e}`
      );
    }
  } else {
    await ctx.replyWithHTML(message.confession.noMessage);
  }
}
