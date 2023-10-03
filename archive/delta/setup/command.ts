import { composer, middleware, dungeon } from "../../core";
import * as consoles from "../../utils/log";
import * as resource from "./resource";
import { TelegrafContext } from "@type/telegraf";

composer.command(`setup`, async (ctx: TelegrafContext) => {
  if (ctx.chat.type === "private" || ctx.chat.type === "channel") {
    return await ctx.replyWithHTML(resource.message.noPrivate);
  }

  if (!(await dungeon.getAllID()).map((id) => id.id).includes(ctx.chat.id)) {
    return await ctx.replyWithHTML(resource.message.notRegistered);
  }

  if (!(await resource.isUserAdmin(ctx, ctx.from.id))) {
    return await ctx.replyWithHTML(resource.message.notAdmin);
  }

  return await ctx.replyWithHTML(resource.message.confirm, {
    reply_markup: resource.keyboard,
  });
});

middleware(composer);
consoles.module(__filename);
