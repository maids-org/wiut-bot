import { composer } from "@/providers/global";
import { MaidContext } from "@type/global";

import * as consoles from "@/utils/log";
import * as resource from "./resource";

composer.callbackQuery(resource.parsers.query, async (ctx: MaidContext) => {
  const parsed = resource.parsers.query.exec(ctx.match![0]);

  await ctx
    .editMessageText(resource.message(true, parsed![1]), {
      parse_mode: "HTML",
      reply_markup: await resource.keyboard(parseInt(parsed![1])),
    })
    .catch(null);
});

consoles.moduler(__filename);
