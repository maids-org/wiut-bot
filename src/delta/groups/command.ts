import { composer, middleware } from "@src/core";
import * as consoles from "@src/utils";
import * as resource from "./resource";
import { TelegrafContext } from "telegraf/typings/context";

composer.command(`groups`, async (ctx: TelegrafContext) => {
  try {
    await ctx
      .replyWithHTML(resource.message(false), {
        parse_mode: "HTML",
        reply_markup: await resource.keyboard(0),
      })
      .catch(null);
  } catch (error) {
    consoles.errors(error);
  }
});

middleware(composer);
consoles.module(__filename);
