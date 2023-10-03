import { composer, middleware, dungeon } from "../../core";
import { TelegrafContext } from "@type/telegraf";
import * as consoles from "../../utils/log";
import * as resource from "./resource";

const trusted = [756870298];

composer.hears(/^\/admin(.*)/gi, async (ctx: TelegrafContext) => {
  const command = ctx.match[1].trimStart();

  if (!trusted.includes(ctx.message.from.id)) {
    return await ctx.replyWithHTML(resource.message.noPrivilege);
  }

  try {
    switch (command === "") {
      case true:
        if (!ctx.message.reply_to_message) {
          return await ctx.replyWithHTML(resource.message.noAdmin);
        }
        await dungeon.newAdmin(ctx.message.reply_to_message.from.id);
        return await ctx.replyWithHTML(resource.message.added);
      case false:
        if (command.length < 6) {
          return await ctx.replyWithHTML(resource.message.nonAdmin);
        }
        await dungeon.newAdmin(parseInt(command));
        return await ctx.replyWithHTML(resource.message.added);
    }
  } catch (_) {
    return await ctx.replyWithHTML(resource.message.error);
  }
});

middleware(composer);
consoles.module(__filename);
