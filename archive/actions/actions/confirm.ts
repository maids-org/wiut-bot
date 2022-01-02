import { composer, middleware } from "../../../src/core/bot";
import * as consoles from "../../../src/utils";
import { TelegrafContext } from "telegraf/typings/context";
import { Markup } from "telegraf";
import fetch from "node-fetch";

composer.action(/confirm_prompt_(.+)/gi, async (ctx: TelegrafContext) => {
  await ctx.editMessageText(
    `<b>Confirm your actions please!</b>\n\n` +
      `Are you sure, that you want to register <i>${ctx.match[1]}</i> to our database?`,
    {
      parse_mode: "HTML",
      reply_markup: Markup.inlineKeyboard([
        Markup.callbackButton("Yes", `confirm_yes_${ctx.match[1]}`),
        Markup.callbackButton("No", `confirm_no_${ctx.match[1]}`),
      ]),
    }
  );
});

composer.action(/confirm_yes_(.+)/gi, async (ctx: TelegrafContext) => {
  const request = await fetch(
    `https://maid-dungeon.vercel.app/groups/new?id=${ctx.chat.id}&module=${
      ctx.match[1]
    }&link=${await ctx.exportChatInviteLink()}`
  );
  console.log(request);

  if (request.status === 200) {
    return await ctx.editMessageText(
      `<b>Thank you for using our service! From tomorrow, you can start using our functionalities! You will start receiving notifications 10 minutes before classes.</b>`,
      {
        parse_mode: "HTML",
      }
    );
  } else {
    return await ctx.editMessageText(
      `<b>Something went wrong. Please try again later.</b>`,
      {
        parse_mode: "HTML",
      }
    );
  }
});

composer.action(/confirm_no_(.+)/gi, async (ctx: TelegrafContext) => {
  await ctx.deleteMessage();
});

middleware(composer);
consoles.module(__filename);
