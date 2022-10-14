import { composer, dungeon, middleware } from "@src/core";
import * as consoles from "@src/utils";
import * as resource from "./resource";
import { TelegrafContext } from "@type/telegraf";

composer.action(/setup_(.+)/gi, async (ctx: TelegrafContext) => {
  if (!(await resource.isUserAdmin(ctx, ctx.from.id))) {
    return await ctx.answerCbQuery(resource.message.notAdmin);
  }

  const answer: boolean = ctx.match[1] === "yes";

  if (!answer) {
    return await ctx.editMessageText(`<i>Ok...</i>`, {
      parse_mode: "HTML",
    });
  }

  if (!(await resource.isAdmin(ctx))) {
    return await ctx.answerCbQuery(resource.message.commandNoAdmin);
  }

  if (!(await resource.canChange(ctx))) {
    return await ctx.answerCbQuery(resource.message.commandNoChangePerm);
  }

  const group = await dungeon.getByID(ctx.chat.id);

  await ctx.telegram.callApi("setChatPhoto", {
    chat_id: ctx.chat.id,
    photo: {
      url: `https://og.maid.uz/group?name=${group.module}`,
      filename: `${group.module}.png`,
    },
  });

  await ctx.telegram.callApi("setChatTitle", {
    chat_id: ctx.chat.id,
    title: `The ${group.module}`,
  });

  await ctx.telegram.callApi("setChatDescription", {
    chat_id: ctx.chat.id,
    description: `Telegram group chat created for ${group.module}. Please, use /show command to hide or make group public~ Powered by Mad Maids!`,
  });

  await ctx.editMessageText(`<i>Done!</i>`, {
    parse_mode: "HTML",
  });
});

middleware(composer);
consoles.module(__filename);
