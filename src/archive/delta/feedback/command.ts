import { composer, middleware } from "@/archive/core";
import * as consoles from "@/archive/utils/log";
import * as resource from "./resource";
import { TelegrafContext } from "telegraf/typings/context";

composer.command(`feedback`, async (ctx: TelegrafContext) => {
  try {
    await ctx
      .replyWithHTML(resource.message, {
        parse_mode: "HTML",
        reply_markup: resource.keyboard,
      })
      .catch(null);
  } catch (error) {
    consoles.errors(error);
  }
});

middleware(composer);
consoles.module(__filename);
