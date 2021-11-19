import { composer, middleware } from "../../../src/core/bot";
import * as consoles from "../../../src/utils";
import security from "../security";
import * as database from "@database/db";
import { TelegrafContext } from "telegraf/typings/context";

composer.command(`reset`, async (ctx: TelegrafContext) => {
  await security(ctx, async () => {
    database.users.temporary = [];
    await ctx.replyWithHTML(`<b>Temporary admins successfully reset!</b>`, {
      parse_mode: "HTML",
    });
  });
});

middleware(composer);
consoles.module(__filename);
