import { composer, middleware } from "@src/core";
import { TelegrafContext } from "@type/telegraf";
import * as consoles from "@src/utils";
import * as resource from "./resource";

composer.start(async (ctx: TelegrafContext) => {
  try {
    if (ctx.startPayload) {
      await ctx.replyWithHTML(resource.payload, {
        parse_mode: "HTML",
        reply_markup: resource.inline(ctx.startPayload.replace(/-_-/gi, " ")),
      }).catch(null);
    }

    if (!ctx.startPayload) {
      await ctx.replyWithHTML(resource.message, {
        parse_mode: "HTML",
        reply_markup: resource.keyboard,
      }).catch(null);
    }
  } catch (error) {
    consoles.errors(error);
  }
});

middleware(composer);
consoles.module(__filename);
