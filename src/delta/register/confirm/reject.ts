import { TelegrafContext } from "telegraf/typings/context";
import { composer, middleware } from "@src/core";
import * as consoles from "@src/utils";

composer.action(/confirm_no_(.+)/gi, async (ctx: TelegrafContext) => {
  await ctx.deleteMessage();
  await ctx.replyWithHTML(
    `<b>Alright, I won't do it. if you change your mind, I'd be here for you!</b>`
  );
});

middleware(composer);
consoles.module(__filename);
