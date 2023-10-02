import { composer } from "@/providers/global";
import { MaidContext } from "@type/conversation";

import * as consoles from "@/utils/log";
import * as resource from "./resource";

composer.on(":text", async (ctx: MaidContext) => {
  try {
    if (ctx.chat!.type === "private") {
      if ((await resource.admins()).includes(ctx.from!.id)) {
        return await ctx.reply(
          `<b>You have been identified as admin</b>` +
            `\n` +
            `If you want to <b>send it to all groups</b>, simply reply <code>/send</code> to this message`,
          {
            reply_to_message_id: ctx.message!.message_id,
          },
        );
      }

      if (!ctx.message!.via_bot) {
        return await ctx
          .reply(resource.message, {
            parse_mode: "HTML",
            reply_markup: resource.keyboard,
          })
          .catch(null);
      }
    }
  } catch (error) {
    consoles.errors(error);
  }
});

consoles.moduler(__filename);
