import cron from "node-cron";
import { composer, middleware, bot } from "@src/core";
import * as consoles from "@src/utils";
import Dungeon from "@src/dungeon";
import { Timetable } from "@src/database";
import * as resource from "./resource";

// Timetable CRON
(async () => {
  const dungeon = new Dungeon();
  for (const group of (await dungeon.getAllModule()).map((m) => m.module)) {
    const timetable = new Timetable(group);
    for (const day of Object.keys(timetable.getAllLessons())) {
      for (const subject of timetable.getAllLessons()[day]) {
        cron.schedule(
          `50 ${subject.start - 1.0} * * ${day}`,
          async () => {
            await bot.telegram
              .sendMessage(
                (await dungeon.getByMod(group)).id,
                resource.message(subject),
                {
                  reply_markup: resource.keyboard(timetable.getTimetableLink()),
                  parse_mode: "HTML",
                }
              )
              .catch(null);
          },
          {
            timezone: "Asia/Tashkent",
          }
        );
      }
    }
  }
})();

middleware(composer);
consoles.module(__filename);
