import { composer, middleware, dungeon } from "@src/core";
import * as consoles from "@src/utils";
import * as resource from "./resource";
import { TelegrafContext } from "@type/telegraf";
import register from "@delta/register";

composer.command(`stats`, async (ctx: TelegrafContext) => {
  try {
    if (ctx.chat.type === "group" || ctx.chat.type === "supergroup") {
      const group = await dungeon.getByID(ctx.chat.id);
      await ctx
        .replyWithHTML(
          resource.message(group.module, ctx, await register.isAdmin(ctx)),
          {
            parse_mode: "HTML",
            reply_markup: resource.keyboard,
          },
        )
        .catch(null);
    } else {
      await ctx.replyWithHTML(`<b>Do it on your module group man...</b>`);
    }
  } catch (error) {
    consoles.errors(error);
  }
});

middleware(composer);
consoles.module(__filename);
