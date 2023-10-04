import { composer } from "@/providers/global";
import * as consoles from "@/utils/log";
import * as resource from "./resource";
import { MaidContext } from "@type/global";


composer.command(`feedback`, async (ctx: MaidContext) => {
  try {
    await ctx
      .reply(resource.message, {
        parse_mode: "HTML",
        reply_markup: resource.keyboard,
      })
      .catch(null);
  } catch (error) {
    consoles.errors(error);
  }
});

consoles.moduler(__filename);
