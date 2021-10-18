/**
 * Confession Session
 * @confession
 * @description Create another session with submodule system
 */

import { middleware, composer } from "@core/bot";
import * as consoles from "@layouts/consoles";
import { Stage, BaseScene, Markup } from "telegraf";
import { TelegrafContext } from "@type/telegraf";
import { used } from "@database/user";

// Functions
import help from "./help";
import show from "./show";
import clear from "./clear";
import enter from "./enter";
import text from "./text";
import left from "./leave";
import media from "./media";

// WARNING! Constants
const confession = new BaseScene("confession");
const scenes = new Stage([confession]);
const { leave } = Stage;

// Obfuscate session manager
confession
  .enter(async (ctx: TelegrafContext) => await enter(ctx))
  .help(async (ctx: TelegrafContext) => await help(ctx))
  .command("show", async (ctx: TelegrafContext) => await show(ctx))
  .command("clear", async (ctx: TelegrafContext) => await clear(ctx))
  .command("stop", leave())
  .command("exit", async (ctx: TelegrafContext) => {
    await clear(ctx);
    leave();
  })
  .on("text", async (ctx: TelegrafContext) => await text(ctx))
  .on(
    ["photo", "video", "animation", "audio", "sticker"],
    async (ctx: TelegrafContext) => await media(ctx)
  )
  .leave(async (ctx: TelegrafContext) => await left(ctx));

// Command manager

composer.command("confession", async (ctx: TelegrafContext) => {
  if (ctx.chat.type === "private") {
    if (!used.includes(ctx.from.id)) {
      await ctx.scene.enter("confession");
    }

    if (used.includes(ctx.from.id)) {
      await ctx.replyWithHTML(
        `<b>You're allowed to use this command once in a day!</b>`
      );
    }
  } else {
    await ctx.replyWithHTML("<b>Allowed only in private chat!</b>", {
      reply_markup: Markup.inlineKeyboard([
        Markup.urlButton(`Go Private`, `https://t.me/westmaid_bot`),
      ]),
    });
  }
});

middleware(scenes);
middleware(composer);
consoles.module(__filename);
