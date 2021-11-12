import { composer, middleware } from "@core/bot";
import * as consoles from "@layouts/consoles";
// import * as message from "@layouts/messages";
// import * as keyboard from "@layouts/keyboards";
// import * as database from "@database/db";
import { TelegrafContext } from "telegraf/typings/context";
import { promises } from "fs";
import { join } from "path";
import fetch from "node-fetch";
import { Markup } from "telegraf";
import { CallbackButton, InlineKeyboardButton } from "telegraf/typings/markup";

composer.action(/register_(.+)/gi, async (ctx: TelegrafContext) => {
  const subgroup = ctx.match[1];
  const data = await fetch(
    "https://maid-dungeon.vercel.app/groups"
  ).then((res) => res.json());
  const availableGroups = (
    await promises.readdir(join("timetable", subgroup))
  ).map((file) => file.replace(".json", ""));
  const registered = data.results.map((group) => group.module);
  const serialize = availableGroups.filter(
    (group) => !registered.includes(group)
  );
  await ctx.editMessageText(
    "<b>Now, choose your group:</b>\n\n<b>If your group is missing, probably it has already been registered by someone!</b>",
    {
      parse_mode: "HTML",
      reply_markup: Markup.inlineKeyboard(
        serialize.map((key) =>
          Markup.callbackButton(key, `confirm_prompt_${key}`)
        ),
        {
          columns: 3,
        }
      ),
    }
  );
});

composer.action("register", async (ctx: TelegrafContext) => {
  if (
    ctx.chat.type === "group" ||
    ctx.chat.type === "supergroup" ||
    ctx.chat.type === "private"
  ) {
    const availableGroups = await promises.readdir(join("timetable"));

    const keyboard = availableGroups.map((module) =>
      Markup.callbackButton(module, `register_${module}`)
    );

    await ctx.editMessageText(
      `<b>Choose your course from the buttons above:</b>`,
      {
        parse_mode: "HTML",
        reply_markup: Markup.inlineKeyboard(keyboard, {
          columns: 3,
        }),
      }
    );
  } else {
    await ctx.editMessageText(`<b>We don't register ${ctx.chat.type}s</b>`, {
      parse_mode: "HTML",
    });
  }
});

middleware(composer);
consoles.module(__filename);
