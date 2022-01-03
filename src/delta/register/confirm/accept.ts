import { composer, middleware } from "@src/core";
import { TelegrafContext } from "telegraf/typings/context";
import * as consoles from "@src/utils";
import * as resource from "./resource";
import Dungeon from "@src/dungeon";

composer.action(/confirm_yes_(.+)/gi, async (ctx: TelegrafContext) => {
  const dungeon = new Dungeon();
  const link = await ctx.exportChatInviteLink();
  console.log("Trigger", link)
  const request = await dungeon.newGroup(ctx.chat.id, ctx.match[1], link);

  request.msg === "OK!"
    ? await ctx.editMessageText(await resource.message.accept(true), {
        parse_mode: "HTML",
      })
    : await ctx.editMessageText(await resource.message.accept(false), {
        parse_mode: "HTML",
      });
});

middleware(composer);
consoles.module(__filename);
