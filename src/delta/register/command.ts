import { composer, middleware, dungeon } from "@src/core";
import * as consoles from "@src/utils";
import * as resource from "./resource";
import { TelegrafContext } from "telegraf/typings/context";

composer.command("register", async (ctx: TelegrafContext) => {
  try {
    if (ctx.chat.type === "private" || ctx.chat.type === "channel") {
      return await ctx.replyWithHTML(resource.message.noPrivate);
    }

    if (
      (await dungeon.getAllID())
        .map((content) => content.id)
        .includes(ctx.chat.id)
    ) {
      return await ctx.replyWithHTML(resource.message.commandExists);
    }

    if (!(await resource.isAdmin(ctx))) {
      return await ctx.replyWithHTML(resource.message.commandNoAdmin);
    }

    if (!(await resource.canInvite(ctx))) {
      return await ctx.replyWithHTML(resource.message.commandNoInvitePerm);
    }

    if (
      ctx.chat.type === "group" ||
      ctx.chat.type === "supergroup" ||
      ctx.chat.type === "private"
    ) {
      await ctx.replyWithHTML(resource.message.commandSuccess, {
        reply_markup: await resource.keyboard.command(),
      });
    } else {
      await ctx.replyWithHTML(await resource.message.commandFail(ctx));
    }
  } catch (error) {
    consoles.errors(error);
  }
});

middleware(composer);
consoles.module(__filename);
