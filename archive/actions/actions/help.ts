import { composer, middleware } from "../../../src/core/bot";
import * as consoles from "../../../src/utils";
import * as message from "../../../src/layouts/messages";
import * as keyboard from "../../../src/layouts/keyboards";
import * as database from "@database/db";
import { TelegrafContext } from "telegraf/typings/context";

composer.action(`help`, async (ctx: TelegrafContext) => {
  if (
    database.users.eternal.includes(ctx.from.id) ||
    database.users.temporary.includes(ctx.from.username)
  )
    await ctx.editMessageText(message.help(true), {
      parse_mode: "HTML",
      reply_markup: keyboard.help,
    });
  else
    await ctx.editMessageText(message.help(false), {
      parse_mode: "HTML",
      reply_markup: keyboard.help,
    });
});

middleware(composer);
consoles.module(__filename);
