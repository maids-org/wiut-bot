import { composer, middleware, dungeon } from "@src/core";
import { TelegrafContext } from "telegraf/typings/context";
import * as consoles from "@src/utils";
import * as resource from "./resource";

composer.action(/confirm_yes_(.+)/gi, async (ctx: TelegrafContext) => {
  try {
    await dungeon.newGroup(
      ctx.chat.id,
      ctx.match[1],
      await ctx.exportChatInviteLink()
    );
    await ctx.editMessageText(await resource.message.accept(true), {
      parse_mode: "HTML",
    });
  } catch (e) {
    await ctx.editMessageText(await resource.message.accept(false), {
      parse_mode: "HTML",
    });
  }
});

middleware(composer);
consoles.module(__filename);
