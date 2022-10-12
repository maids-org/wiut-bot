import { composer, dungeon, middleware } from "@src/core";
import * as consoles from "@src/utils";
import * as resource from "./resource";
import { TelegrafContext } from "telegraf/typings/context";
import { OnlyId } from "@type/dungeon";

composer.action(/show_(.+)/gi, async (ctx: TelegrafContext) => {
  if (!(await dungeon.getAllID()).map((id) => id.id).includes(ctx.chat.id)) {
    return await ctx.editMessageText(resource.message.notRegistered);
  }

  const admins = (await dungeon.getAllAdmins()).map((user: OnlyId) => user.id);

  if (!admins.includes(ctx.from.id)) {
    return await ctx.answerCbQuery(resource.message.notAdmin);
  }

  switch (ctx.match[1]) {
    case "on":
      await dungeon.toggleShow(ctx.chat.id, true);
      break;
    case "off":
      await dungeon.toggleShow(ctx.chat.id, false);
      break;
  }

  const group = await dungeon.getByID(ctx.chat.id);

  await ctx
    .editMessageText(resource.message.call(group.show), {
      parse_mode: "HTML",
      reply_markup: await resource.keyboard(group.show),
    })
    .catch(null);
});

middleware(composer);
consoles.module(__filename);
