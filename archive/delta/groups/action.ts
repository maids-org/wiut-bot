import { composer, middleware } from "../../core";
import * as consoles from "../../utils/log";
import * as resource from "./resource";
import { TelegrafContext } from "telegraf/typings/context";

composer.action(/groups_(.+)/gi, async (ctx: TelegrafContext) => {
  await ctx
    .editMessageText(resource.message(true, ctx.match[1]), {
      parse_mode: "HTML",
      reply_markup: await resource.keyboard(parseInt(ctx.match[1])),
    })
    .catch(null);
});

middleware(composer);
consoles.module(__filename);
