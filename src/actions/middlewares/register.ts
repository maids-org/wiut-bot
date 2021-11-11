import { composer, middleware } from "@core/bot";
import * as consoles from "@layouts/consoles";
// import * as message from "@layouts/messages";
// import * as keyboard from "@layouts/keyboards";
// import * as database from "@database/db";
import fetch from "node-fetch";
import { TelegrafContext } from "telegraf/typings/context";
import { Markup } from "telegraf";

const groups = [];

composer.command("register", async (ctx: TelegrafContext) => {
  if (
    ctx.chat.type === "group" ||
    ctx.chat.type === "supergroup" ||
    ctx.chat.type === "private"
  ) {
    const data = await fetch(
      "https://maid-dungeon.vercel.app//groups"
    ).then((res) => res.json());
    const serialize = data.results.map((group) => group.module);
    const keyboard = [
      serialize.map((module) =>
        Markup.callbackButton(module, `register_${module}`)
      ),
    ];
    await ctx.replyWithHTML(`<b>Choose which group you are?</b>`, {
      reply_markup: Markup.inlineKeyboard(keyboard),
    });
  } else {
    await ctx.replyWithHTML(`<b>We don't register ${ctx.chat.type}s</b>`);
  }
});

middleware(composer);
consoles.module(__filename);
