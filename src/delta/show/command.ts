import { composer, dungeon, middleware } from "@src/core";
import { TelegrafContext } from "@type/telegraf";
import * as consoles from "@src/utils";
import * as resource from "./resource";
import { OnlyId } from "@type/dungeon";

composer.command("show", async (ctx: TelegrafContext) => {
  if (!(await dungeon.getAllID()).map((id) => id.id).includes(ctx.chat.id)) {
    return await ctx.replyWithHTML(resource.message.notRegistered);
  }

  const admins = (await dungeon.getAllAdmins()).map((user: OnlyId) => user.id);

  if (!admins.includes(ctx.from.id)) {
    return await ctx.replyWithHTML(resource.message.notAdmin);
  }

  const group = await dungeon.getByID(ctx.chat.id);

  await ctx
    .replyWithHTML(resource.message.text, {
      parse_mode: "HTML",
      reply_markup: resource.keyboard(group.show),
    })
    .catch(null);
});

middleware(composer);
consoles.module(__filename);
