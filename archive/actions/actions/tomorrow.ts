import { composer, middleware } from "../../../src/core/bot";
import { Markup } from "telegraf";
import * as consoles from "../../../src/utils";
import dataset from "../../../src/database/timetable";
import { editLink } from "@database/db";
import groupLink from "../../../src/database/timetableLinks";
import { TelegrafContext } from "telegraf/typings/context";
import fetch from "node-fetch";

composer.action(/tomorrow_(.+)/gi, async (ctx: TelegrafContext) => {
  const tomorrowDay = parseInt(ctx.match[1]);
  const database = await dataset(ctx.chat.id);
  const thisGroup = await fetch(
    "https://maid-dungeon.vercel.app/groups/id/" + ctx.chat.id
  ).then((res) => res.json());

  const tomorrow = async () => {
    let text = `<b>⛓ Today's Timetable for ${thisGroup.module} ⛓</b>`;

    for (const subject of database[tomorrowDay]) {
      const subText =
        `\n` +
        `\n` +
        `<b>💠 Name:</b> <i>${subject.name}</i> \n` +
        `<b>🌀 Type:</b> <i>${subject.type}</i> \n` +
        `<b>👨‍💻 Tutor:</b> <i>${subject.tutor}</i> \n` +
        `<b>⏰ Time (start-end):</b> <code>${subject.start}-${
          subject.start + subject.length
        }</code> \n` +
        `<b>📍 Location:</b> <i>${subject.location}</i>`;

      text += subText;
    }

    if (database[tomorrowDay][0] === undefined) {
      text +=
        `\n` +
        `\n` +
        `<b>🎉 Feel free to enjoy today, you don't have any classes!</b>`;
    }

    const editString =
      `\n` +
      `\n` +
      `<b>⚠ If you found mistake, please take consider correcting</b> <a href="${editLink}">timetable</a> <b>in our repository!</b>`;

    text += editString;

    return text;
  };

  await ctx.editMessageText(await tomorrow(), {
    parse_mode: "HTML",
    reply_markup: Markup.inlineKeyboard([
      [Markup.callbackButton(`◀ Back`, `timetable`)],
      [Markup.urlButton(`🕸 Webtable`, `${await groupLink(ctx.chat.id)}`)],
    ]),
    disable_web_page_preview: true,
  });
});

middleware(composer);
consoles.module(__filename);
