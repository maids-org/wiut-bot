import { composer } from "@/providers/global";
import { MaidContext } from "@type/global";

import * as consoles from "@/utils/log";
import * as resource from "./resource";

composer.command(`groups`, async (ctx: MaidContext) => {
  try {
    await ctx
      .reply(resource.message(false), {
        parse_mode: "HTML",
        reply_markup: await resource.keyboard(),
      })
      .catch(null);
  } catch (error) {
    consoles.errors(error);
  }
});

consoles.moduler(__filename);
