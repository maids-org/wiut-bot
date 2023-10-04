import cron from "node-cron";
import { scheduler } from "@/providers/global";

import { initTimetable } from "@delta/cron/timetable";
import chalk from "chalk";

// Data CRON
(async () => {
  cron.schedule(
    "0 2 * * *",
    async () => {
      console.log(chalk.blue("Cleaning up the scheduler..."));
      scheduler.clean();

      console.log(chalk.blue("Re-initializing the timetable..."));
      await initTimetable();
    },
    {
      timezone: "Asia/Tashkent",
    },
  );
})();
