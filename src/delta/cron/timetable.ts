import { bot } from "@/core";
import { scheduler, dungeon } from "@/providers/global";

import * as consoles from "@/utils/log";
import * as resource from "./resource";

import cron from "node-cron";
import Timetable from "@/providers/timetable";

// Timetable CRON
export async function initTimetable() {
  for (const group of (await dungeon.getAllModule()).map((m) => m.module)) {
    const timetable = new Timetable(group);
    for (const day of Object.keys(timetable.getAllLessons())) {
      for (const subject of timetable.getAllLessons()[day]) {
        /**
         * Alarm students
         * 1 hour before
         */
        scheduler.add(
          cron.schedule(
            `00 ${subject.start - 1.0} * * ${day}`,
            async () => {
              await bot.api
                .sendMessage(
                  (await dungeon.getByMod(group)).id!,
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
              scheduled: false,
              timezone: "Asia/Tashkent",
            },
          ),
        );

        /**
         * Alarm students
         * 10 minutes before
         */
        scheduler.add(
          cron.schedule(
            `50 ${subject.start - 1.0} * * ${day}`,
            async () => {
              await bot.api
                .sendMessage(
                  (await dungeon.getByMod(group)).id!,
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
              scheduled: false,
              timezone: "Asia/Tashkent",
            },
          ),
        );
      }
    }
  }

  scheduler.start();
}

(async () => {
  await initTimetable();
})();

consoles.moduler(__filename);
