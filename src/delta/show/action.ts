import { composer, dungeon } from "@/providers/global";
import { MaidContext } from "@type/global";

import * as consoles from "@/utils/log";
import * as resource from "./resource";

composer.callbackQuery(resource.parsers.query, async (ctx: MaidContext) => {
  if (!(await dungeon.getAllID()).map((id) => id.id).includes(ctx.chat!.id)) {
    return await ctx.editMessageText(resource.message.notRegistered);
  }

  if (!(await resource.isAdmin(ctx, ctx.from!.id))) {
    return await ctx.answerCallbackQuery(resource.message.notAdmin);
  }

  const parsed = resource.parsers.query.exec(ctx.match![0]);

  switch (parsed![1]) {
    case "on":
      await dungeon.toggleShow(ctx.chat!.id, true);
      break;
    case "off":
      await dungeon.toggleShow(ctx.chat!.id, false);
      break;
  }

  const group = await dungeon.getByID(ctx.chat!.id);

  await ctx
    .editMessageText(resource.message.call(group.show!), {
      parse_mode: "HTML",
      reply_markup: resource.keyboard(group.show!),
    })
    .catch(null);
});

consoles.moduler(__filename);
