import { composer, dungeon } from "@/providers/global";
import { MaidContext } from "@type/global";

import * as consoles from "@/utils/log";
import * as resource from "./resource";

import Timetable from "@/providers/timetable";
import Time from "@/providers/time";


composer.callbackQuery(`timetable`, async (ctx: MaidContext) => {
  const time = new Time();
  const timetable = new Timetable((await dungeon.getByID(ctx.chat!.id)).module!);
  const today = time.getUzbTimeString(false);
  const tomorrow = time.getUzbTimeString(true);

  await ctx.editMessageText(
    await resource.message(dungeon, ctx, timetable, today, true, false),
    {
      parse_mode: "HTML",
      disable_web_page_preview: true,
      reply_markup: await resource.keyboard(timetable, tomorrow, false),
    },
  );
});

composer.callbackQuery(resource.parsers.query, async (ctx: MaidContext) => {
  const parsed = resource.parsers.query.exec(ctx.match![0]);

  const timetable = new Timetable((await dungeon.getByID(ctx.chat!.id)).module!);
  const tomorrow = parseInt(parsed![1]);

  await ctx.editMessageText(
    await resource.message(dungeon, ctx, timetable, tomorrow, false, true),
    {
      parse_mode: "HTML",
      reply_markup: await resource.keyboard(timetable, tomorrow, true),
      disable_web_page_preview: true,
    },
  );
});

consoles.moduler(__filename);
