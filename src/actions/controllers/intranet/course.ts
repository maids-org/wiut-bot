import { composer, middleware } from "@core/bot";
import { Markup } from "telegraf";
import * as consoles from "@layouts/consoles";
import { TelegrafContext } from "telegraf/typings/context";
import { promises } from "fs";
import { join } from "path";

composer.action(/intranet_course_(.*)/gi, async (ctx: TelegrafContext) => {
  const course = ctx.match[1];
  const courseDataFunction = async () => {
    const file = await promises.readFile(join("./intranet", `${course}.json`), {
      encoding: "utf8",
    });
    return {
      name: course,
      data: {
        ...JSON.parse(file),
      },
    };
  };
  const courseData = await courseDataFunction();
  const keyboard = [];
  for (const topic of Object.keys(courseData.data)) {
    keyboard.push([
      Markup.callbackButton(`${topic}`, `intranet_files_${course}_${topic}`),
    ]);
  }
  keyboard.push([Markup.callbackButton(`⬅ Back`, `intranet`)]);
  const text =
    `🎛 <b>IntraneX</b>` +
    `\n` +
    `\n` +
    `📼 <b>There you can list out modules that exist on our database.</b>` +
    `\n` +
    `\n` +
    `⚠ <b>Choose topic from the list below in order to get files of it:</b>` +
    `\n` +
    `\n` +
    `👉🏻 <b>Cursor:</b> <code>intranet/${course}</code>`;
  await ctx.editMessageText(text, {
    parse_mode: "HTML",
    reply_markup: Markup.inlineKeyboard(keyboard),
  });
});

middleware(composer);
consoles.module(__filename);
