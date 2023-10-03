import { composer, middleware, dungeon } from "../../core";
import * as consoles from "../../utils/log";
import * as resource from "./resource";
import { TelegrafContext } from "@type/telegraf";
import { OnlyId } from "../../types/dungeon";

composer.command(`server`, async (ctx: TelegrafContext) => {
  const admins = (await dungeon.getAllAdmins()).map((user: OnlyId) => user.id);

  if (!admins.includes(ctx.from.id)) {
    return await ctx.replyWithHTML(resource.message(true));
  }

  return await ctx.replyWithHTML(
    resource.message(false, (await dungeon.getAllID()).length),
    {
      reply_markup: resource.keyboard,
    },
  );
});

middleware(composer);
consoles.module(__filename);