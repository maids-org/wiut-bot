import { composer, dungeon } from "@/providers/global";
import { MaidContext } from "@type/global";

import * as consoles from "@/utils/log";
import * as resource from "./resource";

composer.callbackQuery(resource.parsers.accept, async (ctx: MaidContext) => {
  const parsed = resource.parsers.accept.exec(ctx.match![0]);

  try {
    await dungeon.newGroup(
      ctx.chat!.id,
      parsed![1],
      await ctx.exportChatInviteLink(),
    );
    await ctx.editMessageText(await resource.message.accept(true), {
      parse_mode: "HTML",
    });
  } catch (e) {
    await ctx.editMessageText(await resource.message.accept(false), {
      parse_mode: "HTML",
    });
  }
});

consoles.moduler(__filename);
