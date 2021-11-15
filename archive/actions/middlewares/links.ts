import { composer, middleware } from "../../../src/core/bot";
import * as consoles from "../../../src/layouts/consoles";
import * as message from "../../../src/layouts/messages";
import * as keyboard from "../../../src/layouts/keyboards";
import { TelegrafContext } from "telegraf/typings/context";

composer.command(`links`, async (ctx: TelegrafContext) => {
  await ctx.replyWithHTML(message.links, {
    parse_mode: "HTML",
    reply_markup: await keyboard.links(),
  });
});

middleware(composer);
consoles.module(__filename);
