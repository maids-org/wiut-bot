import cron from "node-cron";
import { composer, middleware, bot, dungeon } from "@/archive/core";
import * as consoles from "@/archive/utils/log";
import { Timetable } from "@/archive/database";
import * as resource from "./resource";

// Timetable CRON
(async () => {
  for (const group of (await dungeon.getAllModule()).map((m) => m.module)) {
    const timetable = new Timetable(group);
    for (const day of Object.keys(timetable.getAllLessons())) {
      for (const subject of timetable.getAllLessons()[day]) {
        // 1 hour before
        cron.schedule(
          `00 ${subject.start - 1.0} * * ${day}`,
          async () => {
            await bot.telegram
              .sendMessage(
                (await dungeon.getByMod(group)).id,
                resource.message(false, subject, group),
                {
                  reply_markup: resource.keyboard(
                    false,
                    timetable.getTimetableLink(),
                  ),
                  parse_mode: "HTML",
                },
              )
              .catch(null);
          },
          {
            timezone: "Asia/Tashkent",
          },
        );

        // 10 minutes before
        cron.schedule(
          `50 ${subject.start - 1.0} * * ${day}`,
          async () => {
            await bot.telegram
              .sendMessage(
                (await dungeon.getByMod(group)).id,
                resource.message(true, subject, group),
                {
                  reply_markup: resource.keyboard(
                    true,
                    timetable.getTimetableLink(),
                  ),
                  parse_mode: "HTML",
                },
              )
              .catch(null);
          },
          {
            timezone: "Asia/Tashkent",
          },
        );
      }
    }
  }
})();

middleware(composer);
consoles.module(__filename);
