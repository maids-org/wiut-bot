import { composer } from "@/providers/composer";
import { MaidContext } from "@type/conversation";

import * as consoles from "@/utils/log";
import * as resource from "./resource";

import { User } from "@/providers/user";

composer.command("help", async (ctx: MaidContext): Promise<void> => {
  const database = new User(ctx.from!.id);

  try {
    if (database.admin) {
      await ctx
        .reply(resource.message(true), {
          parse_mode: "HTML",
          reply_markup: resource.keyboard,
        })
        .catch(null);
    } else {
      await ctx
        .reply(resource.message(false), {
          parse_mode: "HTML",
          reply_markup: resource.keyboard,
        })
        .catch(null);
    }
  } catch (error) {
    consoles.errors(error);
  }
});

consoles.moduler(__filename);
