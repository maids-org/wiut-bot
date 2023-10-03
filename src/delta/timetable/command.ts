import { composer, dungeon } from "@/providers/global";
import { MaidContext } from "@type/global";

import * as consoles from "@/utils/log";
import * as resource from "./resource";

import Timetable from "@/providers/timetable";
import Time from "@/providers/time";

composer.command(`timetable`, async (ctx: MaidContext) => {
  if (!ctx.chat!.type.match(/^(group|supergroup)$/)) {
    return await ctx.reply(
      `<b>Look honey, there are tons of telegram users and me as a clueless maiden bot, ` +
        `I can't differentiate you which group from you are. ` +
        `Please, run this command on your group chat, and then I can help you! Kiss 😘</b>`,
      { parse_mode: "HTML" },
    );
  }

  if (!(await dungeon.getAllID()).map((id) => id.id).includes(ctx.chat!.id)) {
    return await ctx.reply(
      "<b>This group is not registered to our database</b> Use /register to register this group",
      { parse_mode: "HTML" },
    );
  }

  const time = new Time();
  const timetable = new Timetable(
    (await dungeon.getByID(ctx.chat!.id)).module!,
  );
  const today = time.getUzbTimeString(false);
  const tomorrow = time.getUzbTimeString(true);

  try {
    await ctx.reply(
      await resource.message(dungeon, ctx, timetable, today, false, false),
      {
        disable_web_page_preview: true,
        parse_mode: "HTML",
        reply_markup: await resource.keyboard(timetable, tomorrow, false),
      },
    );
  } catch (error) {
    consoles.errors(error);
  }
});

consoles.moduler(__filename);
