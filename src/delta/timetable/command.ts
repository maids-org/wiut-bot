import { composer, middleware } from "@src/core";
import * as consoles from "@src/utils";
import { TelegrafContext } from "telegraf/typings/context";
import Dungeon from "@src/dungeon";
import { Timetable, Time } from "@src/database";
import * as resource from "./resource";

composer.command(`timetable`, async (ctx: TelegrafContext) => {
  if (!ctx.chat.type.match(/^(group|supergroup)$/)) {
    return await ctx.replyWithHTML(
      `<b>Look honey, there are tons of telegram users and me as a clueless maiden bot, ` +
        `I can't differentiate you which group from you are. ` +
        `Please, run this command on your group chat, and then I can help you! Kiss 😘</b>`
    );
  }

  const dungeon = new Dungeon();

  if (!(await dungeon.getAllID()).map((id) => id.id).includes(ctx.chat.id)) {
    return await ctx.replyWithHTML(
      "This group is not registered to our database"
    );
  }

  const time = new Time();
  const timetable = new Timetable((await dungeon.getByID(ctx.chat.id)).module);
  const today = time.getUzbTimeString(false);
  const tomorrow = time.getUzbTimeString(true);

  await ctx.replyWithHTML(
    await resource.message(dungeon, ctx, timetable, today, false, false),
    {
      disable_web_page_preview: true,
      reply_markup: await resource.keyboard(timetable, tomorrow, false),
    }
  );
});

middleware(composer);
consoles.module(__filename);
