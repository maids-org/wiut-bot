import { composer, dungeon } from "@/providers/global";
import { MaidContext } from "@type/global";

import * as consoles from "@/utils/log";
import * as resource from "./resource";

composer.command(`setup`, async (ctx: MaidContext): Promise<any> => {
  if (ctx.chat!.type === "private" || ctx.chat!.type === "channel") {
    return await ctx.reply(resource.message.noPrivate, {
      parse_mode: "HTML",
    });
  }

  if (!(await dungeon.getAllID()).map((id) => id.id).includes(ctx.chat!.id)) {
    return await ctx.reply(resource.message.notRegistered, {
      parse_mode: "HTML",
    });
  }

  if (!(await resource.isUserAdmin(ctx, ctx.from!.id))) {
    return await ctx.reply(resource.message.notAdmin, {
      parse_mode: "HTML",
    });
  }

  return await ctx.reply(resource.message.confirm, {
    parse_mode: "HTML",
    reply_markup: resource.keyboard,
  });
});

consoles.moduler(__filename);
