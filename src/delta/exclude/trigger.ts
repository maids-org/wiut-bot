import { composer } from "@/providers/global";
import { MaidContext } from "@type/global";

import * as consoles from "@/utils/log";
import * as resource from "./resource";

composer.on("message", async (ctx: MaidContext) => {
  try {
    if (ctx.message!.new_chat_members) {
      const filtrated = ctx.message!.new_chat_members.filter((user) => user.username === ctx.me.username);

      if (filtrated.length > 0) {
        return await ctx.reply(resource.message.newMember, {
          parse_mode: "HTML",
          reply_markup: resource.keyboard.newMember
        });
      }
    }

  } catch (error) {
    consoles.errors(error);
  }
});

consoles.moduler(__filename);
