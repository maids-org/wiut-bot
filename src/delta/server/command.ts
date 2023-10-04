import { composer, dungeon } from "@/providers/global";
import { MaidContext } from "@type/global";

import * as consoles from "@/utils/log";
import * as resource from "./resource";

import { OnlyId } from "@/types/dungeon";

composer.command(`server`, async (ctx: MaidContext) => {
  const admins = (await dungeon.getAllAdmins()).map((user: OnlyId) => user.id);

  if (!admins.includes(ctx.from!.id)) {
    return await ctx.reply(resource.message(true), {
      parse_mode: "HTML",
    });
  }

  return await ctx.reply(
    resource.message(false, (await dungeon.getAllID()).length),
    {
      parse_mode: "HTML",
      reply_markup: resource.keyboard,
    },
  );
});

consoles.moduler(__filename);
