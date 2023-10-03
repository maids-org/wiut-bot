import { composer, middleware } from "../../core";
import * as consoles from "../../utils/log";
import * as resource from "./resource";
import { TelegrafContext } from "telegraf/typings/context";

composer.command(`links`, async (ctx: TelegrafContext) => {
  try {
    await ctx.replyWithHTML(resource.message, {
      parse_mode: "HTML",
      reply_markup: await resource.keyboard(),
    });
  } catch (error) {
    consoles.errors(error);
  }
});

middleware(composer);
consoles.module(__filename);
