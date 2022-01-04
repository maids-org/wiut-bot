import { composer, middleware } from "@src/core";
import { TelegrafContext } from "@type/telegraf";
import * as consoles from "@src/utils";
import * as resource from "./resource";

composer.start(async (ctx: TelegrafContext) => {
  try {
    switch (ctx.startPayload) {
      case "intranet":
        await ctx.replyWithHTML(
          `<b>Ora, ora... Wanna use intranet, aren't ya senpai?! 😏</b>\n` +
            `<i>Feel free to use command /intranet to access intranet from now so on!</i>`,
          {
            parse_mode: "HTML",
            reply_markup: resource.keyboard,
          }
        );
        break;
      // case "links":
      //   await ctx.replyWithHTML(
      //     `<b>Ohayo Senpai! Take those links and find your groups that you will need...</b>` +
      //       `\n` +
      //       `\n` +
      //       `<b>BIS group chats are located at</b> <code>Private Group Chats</code> <b>section!</b>`,
      //     {
      //       reply_markup: await keyboard.links(),
      //     }
      //   );
      //   break;
      default:
        await ctx.replyWithHTML(resource.message, {
          parse_mode: "HTML",
          reply_markup: resource.keyboard,
        });
        break;
    }
  } catch (error) {
    consoles.errors(error);
  }
});

middleware(composer);
consoles.module(__filename);
