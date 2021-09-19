import { composer, middleware } from "@core/bot";
import * as consoles from "@layouts/consoles";
import * as message from "@layouts/messages";
import * as keyboard from "@layouts/keyboards";
import { TelegrafContext } from "telegraf/typings/context";

composer.command(`links`, async (ctx: TelegrafContext) => {
  await ctx.replyWithHTML(message.links, {
    parse_mode: "HTML",
    reply_markup: await keyboard.links(),
  });
});

middleware(composer);
consoles.module(__filename);
