import { TelegrafContext } from "telegraf/typings/context";
import { composer, middleware } from "@src/core";
import * as consoles from "@src/utils";

composer.action(/confirm_no_(.+)/gi, async (ctx: TelegrafContext) => {
  await ctx.deleteMessage();
});

middleware(composer);
consoles.module(__filename);
