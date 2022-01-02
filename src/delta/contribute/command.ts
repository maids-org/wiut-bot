import { composer, middleware } from "@src/core";
import * as consoles from "@src/utils";
import * as resource from "./resource";
import { TelegrafContext } from "telegraf/typings/context";

composer.command(`contribute`, async (ctx: TelegrafContext) => {
  await ctx.replyWithHTML(resource.message, {
    parse_mode: "HTML",
    reply_markup: resource.keyboard,
  });
});

middleware(composer);
consoles.module(__filename);
