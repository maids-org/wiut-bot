import { composer, middleware } from "@src/core";
import * as consoles from "@src/utils";
import { User } from "@src/database";
import * as resource from "./resource";
import { TelegrafContext } from "telegraf/typings/context";

composer.action(`help`, async (ctx: TelegrafContext) => {
  const database = new User(ctx.from.id);
  if (database.admin)
    await ctx.editMessageText(resource.message(true), {
      parse_mode: "HTML",
      reply_markup: resource.keyboard,
    });
  else
    await ctx.editMessageText(resource.message(false), {
      parse_mode: "HTML",
      reply_markup: resource.keyboard,
    });
});

middleware(composer);
consoles.module(__filename);
