import { composer } from "@/providers/global";
import { MaidContext } from "@type/conversation";

import * as consoles from "@/utils/log";
import * as resource from "./resource";

composer.command(`links`, async (ctx: MaidContext) => {
  try {
    await ctx.reply(resource.message, {
      parse_mode: "HTML",
      reply_markup: resource.keyboard,
    });
  } catch (error) {
    consoles.errors(error);
  }
});

consoles.moduler(__filename);
