import * as dotenv from "dotenv";
import Dungeon from "./dungeon";
import chalk from "chalk";

import { Bot, Composer, session } from "grammy";
import {
  conversations,
  // createConversation,
} from "@grammyjs/conversations";
import { MaidContext } from "./types/conversation";

export const env = process.env;
export const dungeon = new Dungeon(process.env.SUP_URL!, process.env.SUP_KEY!);
export const bot = new Bot<MaidContext>(env.TOKEN!);
export const composer = new Composer();

export const middleware = (mod: Composer<MaidContext>): void => {
  bot.use(mod);
};

export const initEnv = async () => {
  dotenv.config();
  bot.use(
    session({
      initial() {
        return {};
      },
    }),
  );

  bot.use(conversations());
};

export const polling = async () => {
  await bot
    .start()
    .then(() => console.log(chalk.blue("[LAUNCH]"), env.ENVIRONMENT))
    .catch((error: Error) => console.log(chalk.red("[ERROR]"), error));
};

export const launch = async () => {
  await initEnv();
  if (env.ENVIRONMENT === "local") await polling();
  else console.log(chalk.red("[ERROR]"), "Invalid environment");
};

(async () => {
  await launch();
})();
