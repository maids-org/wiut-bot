import chalk = require("chalk");
import * as dotenv from "dotenv";
import { User } from "telegram-typings";
import { TelegrafContext } from "telegraf/typings/context";
import { Telegraf, session } from "telegraf";

export class Core {
  public readonly env: dotenv.DotenvParseOutput;
  public readonly bot: Telegraf<TelegrafContext>;
  constructor() {
    this.env = dotenv.config().parsed;
    this.bot = new Telegraf<TelegrafContext>(this.env.TOKEN);
  }

  protected initEnv() {
    dotenv.config();
    this.bot.telegram.getMe().then((botInfo: User) => {
      this.bot.options.username = botInfo.username;
    });
    this.bot.use(session());
  }

  protected webhook() {
    this.bot
      .launch({
        webhook: {
          domain: this.env.DOMAIN,
          hookPath: "/bot",
          port: parseInt(this.env.PORT),
        },
      })
      .then(async () => {
        console.log(chalk.blue("[LAUNCH]"), this.env.ENVIRONMENT);
      })
      .catch((error: Error) => console.log(chalk.red("[ERROR]"), error));
  }

  protected polling() {
    this.bot
      .launch()
      .then(() => console.log(chalk.blue("[LAUNCH]"), this.env.ENVIRONMENT))
      .catch((error: Error) => console.log(chalk.red("[ERROR]"), error));
  }

  public launch() {
    this.initEnv();
    if (this.env.ENVIRONMENT === "heroku") this.webhook();
    else if (this.env.ENVIRONMENT === "local") this.polling();
    else console.log(chalk.red("[ERROR]"), "Invalid environment");
  }
}
