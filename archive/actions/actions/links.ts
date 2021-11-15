import { composer, middleware } from "../../../src/core/bot";
import * as consoles from "../../../src/layouts/consoles";
import * as message from "../../../src/layouts/messages";
import * as keyboard from "../../../src/layouts/keyboards";
import { TelegrafContext } from "telegraf/typings/context";

composer.action(/links_group_(.+)/gi, async (ctx: TelegrafContext) => {
  const groupMatch = parseInt(ctx.match[1]);
  await ctx.editMessageText(message.linksGroup, {
    parse_mode: "HTML",
    reply_markup: await keyboard.linksGroupChat(groupMatch),
  });
});

composer.action(`links_group`, async (ctx: TelegrafContext) => {
  await ctx.editMessageText(message.linksGroup, {
    parse_mode: "HTML",
    reply_markup: await keyboard.linksGroup(),
  });
});

composer.action(`links`, async (ctx: TelegrafContext) => {
  await ctx.editMessageText(message.links, {
    parse_mode: "HTML",
    reply_markup: await keyboard.links(),
  });
});

middleware(composer);
consoles.module(__filename);
