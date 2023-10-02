import { Bot, webhookCallback } from "grammy";
import "@/utils/config";
import chalk from "chalk";
import * as process from "process";
import composer from "@/providers/composer";
import { MaidContext } from "@type/conversation";

export const bot = new Bot<MaidContext>(process.env.TOKEN || "");
export const handle = webhookCallback(bot, "http");

const initializer = async () => {
  console.log(chalk.blue("[INFO]"), `bot is starting on ${process.env.HOST}`);

  bot.use(composer);

  bot.catch((error) => {
    console.log(error, error.ctx.api);
  });
};

const polling = async () => {
  await bot.start();
};

export const launch = async () => {
  switch (process.env.HOST) {
    case "POLLING":
      await initializer();
      await polling();
      break;
    default:
      throw new Error("Deploy method not validated!");
  }
};

(async () => {
  await launch();
})();