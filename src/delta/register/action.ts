import { composer, dungeon } from "@/providers/global";
import { MaidContext } from "@type/global";

import * as consoles from "@/utils/log";
import * as resource from "./resource";

composer.callbackQuery(resource.parsers.group, async (ctx: MaidContext) => {
  const registrar = await dungeon.getAllModule();
  const parsed = resource.parsers.group.exec(ctx.match![0]);
  const serialize = (await resource.available(parsed![1]))!.filter(
    (group) => !registrar.map((data) => data.module).includes(group),
  );

  await ctx.editMessageText(resource.message.actionList, {
    parse_mode: "HTML",
    reply_markup: await resource.keyboard.action(serialize),
  });
});

composer.callbackQuery("register", async (ctx: MaidContext) => {
  if (
    ctx.chat!.type === "group" ||
    ctx.chat!.type === "supergroup" ||
    ctx.chat!.type === "private"
  ) {
    await ctx.editMessageText(resource.message.commandSuccess, {
      parse_mode: "HTML",
      reply_markup: await resource.keyboard.command(),
    });
  } else {
    await ctx.editMessageText(await resource.message.commandFail(ctx), {
      parse_mode: "HTML",
    });
  }
});

consoles.moduler(__filename);
