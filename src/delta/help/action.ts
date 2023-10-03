import { composer } from "@/providers/global";
import { MaidContext } from "@type/global";

import * as consoles from "@/utils/log";
import * as resource from "./resource";

import { User } from "@/providers/user";

composer.callbackQuery(`help`, async (ctx: MaidContext) => {
  const database = new User(ctx.from!.id);
  if (database.admin)
    await ctx
      .editMessageText(resource.message(true), {
        parse_mode: "HTML",
        reply_markup: resource.keyboard,
      })
      .catch(null);
  else
    await ctx
      .editMessageText(resource.message(false), {
        parse_mode: "HTML",
        reply_markup: resource.keyboard,
      })
      .catch(null);
});

consoles.moduler(__filename);
