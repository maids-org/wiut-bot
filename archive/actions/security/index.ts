import * as database from "@database/db";
import * as message from "../../../src/layouts/messages";
import * as keyboard from "../../../src/layouts/keyboards";
import { TelegrafContext } from "telegraf/typings/context";

export default async (
  ctx: TelegrafContext,
  func: () => void
): Promise<void> => {
  if (
    database.users.eternal.includes(ctx.from.id) ||
    database.users.temporary.includes(ctx.from.username)
  )
    await func();
  else
    await ctx.replyWithHTML(message.errorAdmin, {
      parse_mode: "HTML",
      reply_markup: keyboard.errorAdmin,
    });
};
