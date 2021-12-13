import { composer, middleware } from "@src/core";
import * as consoles from "@src/utils";
import { TelegrafContext } from "telegraf/typings/context";
import Dungeon from "@src/dungeon";
import { Timetable, Time } from "@src/database";
import * as resource from "./resource";

composer.action(`timetable`, async (ctx: TelegrafContext) => {
  const dungeon = new Dungeon();
  const time = new Time();
  const timetable = new Timetable((await dungeon.getByID(ctx.chat.id)).module);
  const today = time.getUzbTimeString(false);
  const tomorrow = time.getUzbTimeString(true);

  await ctx.editMessageText(
    await resource.message(dungeon, ctx, timetable, today, true, false),
    {
      parse_mode: "HTML",
      disable_web_page_preview: true,
      reply_markup: await resource.keyboard(timetable, tomorrow, false),
    }
  );
});

composer.action(/tomorrow_(.+)/gi, async (ctx: TelegrafContext) => {
  const dungeon = new Dungeon();
  const timetable = new Timetable((await dungeon.getByID(ctx.chat.id)).module);
  const tomorrow = parseInt(ctx.match[1]);

  await ctx.editMessageText(
    await resource.message(dungeon, ctx, timetable, tomorrow, false, true),
    {
      parse_mode: "HTML",
      reply_markup: await resource.keyboard(timetable, tomorrow, true),
      disable_web_page_preview: true,
    }
  );
});

middleware(composer);
consoles.module(__filename);
