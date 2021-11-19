import { composer, middleware } from "../../../src/core/bot";
import { Markup } from "telegraf";
import date from "@database/dt";
import * as consoles from "../../../src/utils";
import dataset from "../../../src/database/timetable";
import { editLink } from "@database/db";
import groupLink from "../../../src/database/timetableLinks";
import { TelegrafContext } from "telegraf/typings/context";
import fetch from "node-fetch";

composer.command(`timetable`, async (ctx: TelegrafContext) => {
  const list = await fetch(
    "https://maid-dungeon.vercel.app/groups/id"
  ).then((res) => res.json());
  const extract = list.results.map((item) => item.id);
  const thisGroup = await fetch(
    "https://maid-dungeon.vercel.app/groups/id/" + ctx.chat.id
  ).then((res) => res.json());

  if (!ctx.chat.type.match(/^(group|supergroup)$/)) {
    return await ctx.replyWithHTML(
      `<b>Look honey, there are tons of telegram users and me as a clueless maiden bot, ` +
        `I can't differentiate you which group from you are. ` +
        `Please, run this command on your group chat and then I can help you! Kiss 😘</b>`
    );
  }

  if (!extract.includes(ctx.chat.id)) {
    return await ctx.replyWithHTML(
      "This group is not registered to our database"
    );
  }

  const database = await dataset(ctx.chat.id);
  const currentDay = (await date()).toString();
  const tomorrowDay = ((await date()) + 1).toString();

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

    const editString =
      `\n` +
      `\n` +
      `<b>⚠ If you found mistake, please take consider correcting</b> <a href="${editLink}">timetable</a> <b>of your own group in our repository!</b>`;

    text += editString;

    return text;
  };
  await ctx.replyWithHTML(await timetable(), {
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
