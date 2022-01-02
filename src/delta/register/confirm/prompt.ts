import { composer, middleware } from "@src/core";
import { TelegrafContext } from "telegraf/typings/context";
import * as consoles from "@src/utils";
import * as resource from "./resource";

composer.action(/confirm_prompt_(.+)/gi, async (ctx: TelegrafContext) => {
  await ctx.editMessageText(await resource.message.prompt(ctx), {
    parse_mode: "HTML",
    reply_markup: await resource.keyboard.prompt(ctx),
  });
});

middleware(composer);
consoles.module(__filename);
