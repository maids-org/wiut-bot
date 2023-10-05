import { composer } from "@/providers/global";
import { MaidContext } from "@type/global";

import * as consoles from "@/utils/log";
import * as resource from "./resource";

composer.command("start", async (ctx: MaidContext): Promise<void> => {
  console.log("An update")
  try {
    if (ctx.match) {
      await ctx
        .reply(resource.payload, {
          parse_mode: "HTML",
          reply_markup: resource.inline(
            ctx.match.toString().replace(/-_-/gi, " "),
          ),
        })
        .catch(null);
    }

    if (!ctx.match) {
      await ctx
        .reply(resource.message, {
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
