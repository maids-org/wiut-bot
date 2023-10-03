import { composer, dungeon } from "@/providers/global";
import { MaidContext } from "@type/global";
import * as consoles from "@/utils/log";
import * as resource from "./resource";

composer.command("show", async (ctx: MaidContext) => {
  if (!(await dungeon.getAllID()).map((id) => id.id).includes(ctx.chat!.id)) {
    return await ctx.reply(resource.message.notRegistered, {
      parse_mode: "HTML",
    });
  }

  if (!(await resource.isAdmin(ctx, ctx.from!.id))) {
    return await ctx.reply(resource.message.notAdmin, {
      parse_mode: "HTML",
    });
  }

  const group = await dungeon.getByID(ctx.chat!.id);

  await ctx
    .reply(resource.message.text, {
      parse_mode: "HTML",
      reply_markup: resource.keyboard(group.show!),
    })
    .catch(null);
});

consoles.moduler(__filename);
