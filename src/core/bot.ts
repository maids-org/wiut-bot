/**
 * Application Core Module
 * @module @core
 * @description the main api wrapper point
 * @return { bot, composer, middleware }
 */

import { Telegraf, Composer, Stage, session } from "telegraf";
import { TelegrafContext } from "telegraf/typings/context";
import { SceneContextMessageUpdate } from "telegraf/typings/stage";
import { User } from "telegram-typings";
import env from "@core/env";
import * as consoles from "@layouts/consoles";

export const bot = new Telegraf<TelegrafContext>(env.TOKEN);
export const composer = new Composer<TelegrafContext>();
export const middleware = (
  mod: Composer<TelegrafContext> | Stage<SceneContextMessageUpdate>
): void => {
  bot.use(mod.middleware());
};

bot.telegram.getMe().then((botInfo: User) => {
  bot.options.username = botInfo.username;
});

bot.use(session());
console.clear();

try {
  if (env.ENVIRONMENT === "heroku")
    bot
      .launch({
        webhook: {
          domain: env.DOMAIN,
          hookPath: "/bot",
          port: parseInt(env.PORT),
        },
      })
      .then(async () => {
        consoles.launch(env.ENVIRONMENT);
      })
      .catch((error: Error) => consoles.errors(error));
  else if (env.ENVIRONMENT === "local")
    bot
      .launch()
      .then(() => consoles.launch(env.ENVIRONMENT))
      .catch((error: Error) => consoles.errors(error));
  else consoles.wrongEnv();
} catch (e) {
  console.log(e);
}
