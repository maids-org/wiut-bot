import { composer, dungeon } from "@/providers/global";
import { MaidContext } from "@type/global";

import * as consoles from "@/utils/log";
import * as resource from "./resource";

composer.command(`groups`, async (ctx: MaidContext) => {
  const groups = await dungeon.getAllVisibleByCursor(10, 0);

  if (groups.length === 0) {
    return await ctx.reply("<b>Whoopsie!</b> Seems like nobody registered their group yet...", {
      parse_mode: "HTML",
    });
  }

  try {
    await ctx
      .reply(resource.message(false), {
        parse_mode: "HTML",
        reply_markup: await resource.keyboard(dungeon),
      })
      .catch(null);
  } catch (error) {
    consoles.errors(error);
  }
});

consoles.moduler(__filename);
