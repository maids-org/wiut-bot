import { composer, dungeon } from "@/providers/global";
import * as consoles from "@/utils/log";
import * as resource from "./resource";
import register from "../register";
import { MaidContext } from "@type/global";

composer.command(`stats`, async (ctx: MaidContext) => {
  try {
    if (ctx.chat!.type === "group" || ctx.chat!.type === "supergroup") {
      const group = await dungeon.getByID(ctx.chat!.id);
      await ctx
        .reply(
          resource.message(group.module!, ctx, await register.isAdmin(ctx)),
          {
            parse_mode: "HTML",
            reply_markup: resource.keyboard,
          },
        )
        .catch(null);
    } else {
      await ctx.reply(`<b>Do it on your module group man...</b>`, {
        parse_mode: "HTML",
      });
    }
  } catch (error) {
    consoles.errors(error);
  }
});

consoles.moduler(__filename);
