import { composer, middleware } from "../../../src/core/bot";
import * as consoles from "../../../src/layouts/consoles";
import * as message from "../../../src/layouts/messages";
import * as keyboard from "../../../src/layouts/keyboards";
import { TelegrafContext } from "telegraf/typings/context";

composer.command(`contribute`, async (ctx: TelegrafContext) => {
  await ctx.replyWithHTML(message.contributes, {
    parse_mode: "HTML",
    reply_markup: keyboard.contribute,
  });
});

middleware(composer);
consoles.module(__filename);
