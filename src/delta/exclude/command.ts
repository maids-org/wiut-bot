import { composer, middleware } from "@src/core";
import * as consoles from "@src/utils";
import { TelegrafContext } from "@type/telegraf";
import * as resource from "./resource";

composer.on("text", async (ctx: TelegrafContext) => {
  if (ctx.chat.type === "private")
    if (!ctx.message.via_bot)
      await ctx.replyWithHTML(resource.message, {
        parse_mode: "HTML",
        reply_markup: resource.keyboard,
      });
});

middleware(composer);
consoles.module(__filename);
