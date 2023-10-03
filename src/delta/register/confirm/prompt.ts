import { composer } from "@/providers/global";
import { MaidContext } from "@type/global";

import * as consoles from "@/utils/log";
import * as resource from "./resource";
import { parsers } from "./resource";

composer.callbackQuery(resource.parsers.prompt, async (ctx: MaidContext) => {
  const parsed = parsers.prompt.exec(ctx.match![0]);

  await ctx.editMessageText(await resource.message.prompt(parsed![1]), {
    parse_mode: "HTML",
    reply_markup: await resource.keyboard.prompt(parsed![1]),
  });
});

consoles.moduler(__filename);
