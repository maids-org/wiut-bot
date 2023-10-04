import { composer, dungeon } from "@/providers/global";

import * as consoles from "../../utils/log";
import * as resource from "./resource";
import { MaidContext } from "@/types/global";

const trusted = [5900637111];

composer.hears(resource.parsers.query, async (ctx: MaidContext) => {
  const parsed = resource.parsers.query.exec(ctx.message!.text!);
  const command = parsed![1].trimStart();

  if (!trusted.includes(ctx.message!.from.id)) {
    return await ctx.reply(resource.message.noPrivilege, {
      parse_mode: "HTML",
    });
  }

  try {
    switch (command === "") {
      case true:
        if (!ctx.message!.reply_to_message) {
          return await ctx.reply(resource.message.noAdmin, {
            parse_mode: "HTML",
          });
        }
        await dungeon.newAdmin(
          ctx.message!.reply_to_message.from!.id,
          ctx.message!.reply_to_message.from!.first_name,
          ctx.message!.reply_to_message.from!.username,
          ctx.message!.reply_to_message.from!.last_name,
        );
        return await ctx.reply(resource.message.added, {
          parse_mode: "HTML",
        });
      case false:
        if (command.length < 6) {
          return await ctx.reply(resource.message.nonAdmin, {
            parse_mode: "HTML",
          });
        }
        await dungeon.newAdmin(parseInt(command));
        return await ctx.reply(resource.message.added, {
          parse_mode: "HTML",
        });
    }
  } catch (e) {
    console.log(e)
    return await ctx.reply(resource.message.error, {
      parse_mode: "HTML",
    });
  }
});

consoles.moduler(__filename);
