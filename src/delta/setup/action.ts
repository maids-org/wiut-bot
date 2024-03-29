import { composer, dungeon } from "@/providers/global";
import { MaidContext } from "@type/global";

import * as consoles from "@/utils/log";
import * as resource from "./resource";
import { InputFile } from "grammy";

composer.callbackQuery(resource.parsers.query, async (ctx: MaidContext) => {
  if (!(await resource.isUserAdmin(ctx, ctx.from!.id))) {
    return await ctx.answerCallbackQuery(resource.message.notAdmin);
  }

  const parsed = resource.parsers.query.exec(ctx.match![0]);
  const answer: boolean = parsed![1] === "yes";

  if (!answer) {
    return await ctx.editMessageText(`<i>Ok...</i>`, {
      parse_mode: "HTML",
    });
  }

  if (!(await resource.isAdmin(ctx))) {
    return await ctx.answerCallbackQuery(resource.message.commandNoAdmin);
  }

  if (!(await resource.canChange(ctx))) {
    return await ctx.answerCallbackQuery(resource.message.commandNoChangePerm);
  }

  const group = await dungeon.getByID(ctx.chat!.id);

  await ctx.setChatPhoto(
    new InputFile(new URL(`https://og.maid.uz/group?name=${group.module}`)),
  );

  const title = `The ${group.module}`;
  const groupTitle = "title" in ctx.chat! ? ctx.chat.title : "";
  if (title !== groupTitle) {
    await ctx.setChatTitle(title);
  }

  const description = `Telegram group chat created for ${group.module}. Please, use /show command to hide or make group public~ Powered by Mad Maids!`;
  try {
    await ctx.setChatDescription(description);
  } catch (error) {
    console.log("Seems like we've done this already...");
  }

  await ctx.editMessageText(`✨ <i>Done!</i> ✨`, {
    parse_mode: "HTML",
  });
});

consoles.moduler(__filename);
