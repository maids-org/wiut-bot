import * as dotenv from "dotenv";
import { User } from "telegram-typings";
import { TelegrafContext } from "telegraf/typings/context";
import { Telegraf, session, Composer, Stage } from "telegraf";
import { SceneContextMessageUpdate } from "telegraf/typings/stage";
import Dungeon from "@src/dungeon";
import chalk = require("chalk");

export const env = process.env;
export const dungeon = new Dungeon(process.env.SUP_URL, process.env.SUP_KEY);
export const bot = new Telegraf<TelegrafContext>(env.TOKEN);
export const composer = new Composer<TelegrafContext>();

export const middleware = (
  mod: Composer<TelegrafContext> | Stage<SceneContextMessageUpdate>
): void => {
  bot.use(mod.middleware());
};

export const initEnv = async () => {
  await dotenv.config();
  await bot.telegram.getMe().then((botInfo: User) => {
    bot.options.username = botInfo.username;
  });
  await bot.use(session());
};

export const webhook = async () => {
  await bot
    .launch({
      webhook: {
        domain: env.DOMAIN,
        hookPath: "/bot",
        port: parseInt(env.PORT),
      },
    })
    .then(async () => {
      await console.log(chalk.blue("[LAUNCH]"), env.ENVIRONMENT);
    })
    .catch(async (error: Error) => console.log(chalk.red("[ERROR]"), error));
};

export const polling = async () => {
  await bot
    .launch()
    .then(() => console.log(chalk.blue("[LAUNCH]"), env.ENVIRONMENT))
    .catch((error: Error) => console.log(chalk.red("[ERROR]"), error));
};

export const launch = async () => {
  await initEnv();
  if (env.ENVIRONMENT === "production") await webhook();
  else if (env.ENVIRONMENT === "local") await polling();
  else await console.log(chalk.red("[ERROR]"), "Invalid environment");
};

(async () => {
  await launch();
})();
