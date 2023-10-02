import { composer, dungeon, middleware } from "@/archive/core";
import { TelegrafContext } from "@type/telegraf";
import * as consoles from "@/archive/utils/log";
import * as resource from "./resource";

composer.command("show", async (ctx: TelegrafContext) => {
  if (!(await dungeon.getAllID()).map((id) => id.id).includes(ctx.chat.id)) {
    return await ctx.replyWithHTML(resource.message.notRegistered);
  }

  if (!(await resource.isAdmin(ctx, ctx.from.id))) {
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
