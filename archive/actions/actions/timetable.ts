import { composer, middleware } from "../../../src/core/bot";
import { Markup } from "telegraf";
import date from "@database/dt";
import * as consoles from "../../../src/utils";
import dataset from "../../../src/database/timetable";
import { editLink } from "@database/db";
import groupLink from "../../../src/database/timetableLinks";
import { TelegrafContext } from "telegraf/typings/context";
import fetch from "node-fetch";

composer.action(`timetable`, async (ctx: TelegrafContext) => {
  const database = await dataset(ctx.chat.id);
  const currentDay = (await date()).toString();
  const tomorrowDay = ((await date()) + 1).toString();
  const refreshTime = new Date(
    new Date().getTime() + new Date().getTimezoneOffset() * 60000 + 3600000 * 5
  )
    .toString()
    .replace("GMT+0000 (Coordinated Universal Time)", "")
    .replace("GMT+0500 (Uzbekistan Standard Time)", "");
  const identifier = async (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result.toUpperCase();
  };
  const thisGroup = await fetch(
    "https://maid-dungeon.vercel.app/groups/id/" + ctx.chat.id
  ).then((res) => res.json());

  const timetable = async () => {
    let text = `<b>⛓ Today's Timetable for ${thisGroup.module} ⛓</b>`;

    for (const subject of database[currentDay]) {
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

    if (database[currentDay][0] === undefined) {
      text +=
        `\n` +
        `\n` +
        `<b>🎉 Feel free to enjoy today, you don't have any classes!</b>`;
    }

    const editTime =
      `\n` +
      `\n` +
      `<b>Last Refresh:</b> <code>${
        refreshTime + (await identifier(5))
      }</code>`;

    const editString =
      `\n` +
      `\n` +
      `<b>⚠ If you found mistake, please take consider correcting</b> <a href="${editLink}">timetable</a> <b>in our repository!</b>`;

    text += editTime;
    text += editString;

    return text;
  };
  await ctx.editMessageText(await timetable(), {
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_markup: Markup.inlineKeyboard([
      [Markup.callbackButton(`🔁 Refresh`, `timetable`)],
      [Markup.callbackButton(`⌚ Tomorrow`, `tomorrow_${tomorrowDay}`)],
      [Markup.urlButton(`🕸 Webtable`, `${await groupLink(ctx.chat.id)}`)],
    ]),
  });
});

middleware(composer);
consoles.module(__filename);
