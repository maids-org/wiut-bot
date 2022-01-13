import { composer, middleware, dungeon } from "@src/core";
import * as consoles from "@src/utils";
import * as resource from "./resource";
import { TelegrafContext } from "telegraf/typings/context";

composer.action(/register_(.+)/gi, async (ctx: TelegrafContext) => {
  const registrar = await dungeon.getAllModule();
  const serialize = (await resource.available(ctx.match[1])).filter(
    (group) => !registrar.map((data) => data.module).includes(group)
  );

  await ctx.editMessageText(resource.message.actionList, {
    parse_mode: "HTML",
    reply_markup: await resource.keyboard.action(serialize),
  });
});

composer.action("register", async (ctx: TelegrafContext) => {
  if (
    ctx.chat.type === "group" ||
    ctx.chat.type === "supergroup" ||
    ctx.chat.type === "private"
  ) {
    await ctx.editMessageText(resource.message.commandSuccess, {
      parse_mode: "HTML",
      reply_markup: await resource.keyboard.command(),
    });
  } else {
    await ctx.editMessageText(await resource.message.commandFail(ctx), {
      parse_mode: "HTML",
    });
  }
});

middleware(composer);
consoles.module(__filename);
