import { composer, middleware } from "../../../src/core/bot";
import * as consoles from "../../../src/layouts/consoles";
import { TelegrafContext } from "telegraf/typings/context";

composer.command(
  "talk",
  async (ctx: TelegrafContext) => await ctx.replyWithHTML("Yes?")
);

middleware(composer);
consoles.module(__filename);
