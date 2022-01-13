import { composer, middleware } from "@src/core";
import * as consoles from "@src/utils";
import * as resource from "./resource";
import { TelegrafContext } from "telegraf/typings/context";

composer.action(/groups_(.+)/gi, async (ctx: TelegrafContext) => {
  await ctx
    .editMessageText(resource.message, {
      parse_mode: "HTML",
      reply_markup: await resource.keyboard(parseInt(ctx.match[1])),
    })
    .catch(null);
});

middleware(composer);
consoles.module(__filename);
