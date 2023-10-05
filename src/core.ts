import { Bot, webhookCallback } from "grammy";
import "@/utils/config";
import chalk from "chalk";
import fastify from "fastify";
import * as dotenv from "dotenv";
import * as process from "process";
import { composer } from "@/providers/global";
import { MaidContext } from "@type/global";

export const bot = new Bot<MaidContext>(process.env.TOKEN || "");

const initializer = async () => {
  console.log(chalk.blue("[INFO]"), `bot is starting on ${process.env.HOST}`);

  bot.use(composer);
  bot.catch((error) => {
    console.log(error, error.ctx.api);
  });
};

const webhook = async (): Promise<void> => {
  const server = fastify();

  server.setErrorHandler(async (error, request, response) => {
    await response.status(500).send({ error: "Oops! Something went wrong." });
  });

  server.get("/", (_, reply) => {
    reply.redirect("https://t.me/eastmaid_bot")
  });
  server.post("/", webhookCallback(bot, "fastify"));
  server.get("/set", () => {
    try {
      bot.api.setWebhook(`${process.env.URL}/`);
      return { status: "cyka!" };
    } catch (_) {
      return { status: "blyat!" };
    }
  });

  const port: number = process.env.PORT ? parseInt(process.env.PORT) : 9000;
  server.listen({ port }).then(() => console.log(chalk.blue("[INFO]"), `webhook is starting on ${port}`));
};

export const launch = async () => {
  switch (process.env.HOST) {
    case "polling":
    case "POLLING":
      await initializer();
      await bot.start();
      break;
    case "webhook":
    case "WEBHOOK":
      await initializer();
      await webhook();
      break;
    default:
      throw new Error("Deploy method not validated!");
  }
};

(async () => {
  dotenv.config();
  await launch();
})();
