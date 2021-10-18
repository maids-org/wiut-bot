import cron from "node-cron";
import { used } from "@database/user";

(async () => {
  cron.schedule(
    `0 0 * * *`,
    async () => {
      used.splice(0, used.length);
    },
    {
      timezone: "Asia/Tashkent",
    }
  );
})();
